---
title: Dockerfile for Django Devs
keywords: [docker, django, python]
date: 2025-03-04
---

## Introduction

I absolutely adore Django. It's a fantastic web framework that allows you to prototype quickly while also being powerful enough to scale into production and beyond.

Equally, I love Docker. It has made my life so much easier—both as a developer and as a DevOps engineer.  

Most of my Django projects are containerized, and setting up a Dockerfile is one of the first things I do when starting a new project. Since I don’t usually revisit it until later stages of development, I find it essential to have a solid, reusable template.

![](/images/dockerfile-for-django-devs/intro.jpg)

## Dockerfile and its components

This is a Dockerfile that I usually start with. It is a multi-stage build that expects that you use [uv](https://docs.astral.sh/uv/) for managing dependencies (which you should, it's great) and PostgreSQL as your database (which you probably do anyway). Otherwise, it is quite easy to adapt it to other project managers like Poetry and remove the PostgreSQL dependencies.

```dockerfile
# Builder stage
FROM python:3.13-slim AS builder

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

ENV UV_VERSION=0.6.4

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && pip install --upgrade pip \
    && pip install "uv==$UV_VERSION"

WORKDIR /app

COPY pyproject.toml uv.lock /app/

RUN uv export --format requirements-txt --no-hashes -o /app/requirements.txt
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /app/wheels -r /app/requirements.txt

# Final stage
FROM python:3.13-slim AS final

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

COPY --from=builder /app/wheels /wheels
COPY --from=builder /app/requirements.txt /tmp/requirements.txt
RUN pip install --no-cache-dir --no-index --find-links=/wheels -r /tmp/requirements.txt \
    && rm -rf /wheels /tmp/requirements.txt

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

RUN useradd -U appuser \
    && install -d -m 0755 -o appuser -g appuser /app/staticfiles \
    && install -d -m 0755 -o appuser -g appuser /app/media

WORKDIR /app

COPY --chown=appuser:appuser . .

USER appuser:appuser

RUN python manage.py collectstatic --noinput

ENTRYPOINT [ "/app/entrypoint.sh" ]
CMD [ "server" ]
```

Let's continue by breaking down the Dockerfile line-by-line.

### Builder stage

```dockerfile
FROM python:3.13-slim AS builder
```

This line sets the base image for the builder stage. This example uses Python 3.13, but of course this version varies between the projects. 
What rarely changes, though, is that I use the slim version of the image. 
This is because it is smaller, and I have a preference for installing all the dependencies myself; so far I've never had a problem with the slim version.

```dockerfile
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
```

Setting the `PYTHONUNBUFFERED` environment variable ensures that the Python output is sent straight to the terminal without buffering it first. 
If you don't set this, you might have a delay in seeing the output of your application.

`PYTHONDONTWRITEBYTECODE` prevents Python from writing `.pyc` files to the disk, 
which might reduce the image size if you run the application during build time 
and potentially help you avoid some issues with the cache.

```dockerfile
ENV UV_VERSION=0.6.4
```

This line sets the version of `uv` that we want to use later in the build process. 
Usually you would want to pin the version of `uv` or whatever dependency manager you're using to ensure you have the same dependency resolver version that you've tested with.

```dockerfile
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && pip install --upgrade pip \
    && pip install "uv==$UV_VERSION"
```

We finally get to the dependency installation part. 
First we update the package list to have the latest package versions available, install `build-essential` which is nearly always required for compiling other dependencies, and `libpq-dev` which is required for compiling `psycopg` (the PostgreSQL adapter for Python).
Then we upgrade `pip` to the latest version and install `uv` with the version we set earlier.

```dockerfile
WORKDIR /app
COPY pyproject.toml uv.lock /app/
```

We are copying the `pyproject.toml` and `uv.lock` files to the `/app/` directory in the container. 
Those are the only files we need from the project that we need in the builder stage.

```dockerfile
RUN uv export --format requirements-txt --no-hashes -o /app/requirements.txt
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /app/wheels -r /app/requirements.txt
```

These two lines are the most important in the builder stage.
The first line exports the dependencies to a `requirements.txt` file. This ensures we have a file that we can work with using `pip` in the next line. 
Additionally, we use the `--no-hashes` flag to ensure that the hashes are not included in the file. This is optional, and generally I would recommend to first try to build without the flag. 
I often run into various problems when using the hashes, so I'm mentioning it here as it shows up in my Dockerfiles often.

The second line installs the dependencies into the `/app/wheels` directory. 
This ensures that all required packages are pre-built in a wheel format. 
We can then use these wheels in the final stage to avoid having to install certain compile dependencies, as well as to speed up the process.

### Final stage

```dockerfile
FROM python:3.13-slim AS final
```

This line sets the base image for the final stage. It is quite important to use the same version of Python as in the builder stage,
so you could go ahead and pin the version of the Python image as a build argument, for example.

```dockerfile
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
```

Nothing new here. We set the same environment variables as in the builder stage for the same reasons.

```dockerfile
COPY --from=builder /app/wheels /wheels
COPY --from=builder /app/requirements.txt /tmp/requirements.txt
RUN pip install --no-cache-dir --no-index --find-links=/wheels -r /tmp/requirements.txt \
    && rm -rf /wheels /tmp/requirements.txt
```

These lines copy the compiled Python dependencies and the `requirements.txt` file from the builder stage to the final stage. 
Then we install the dependencies from the wheels directory. We also remove the wheels and the `requirements.txt` file to keep the image size down.

```dockerfile
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*
```

Here we can install all the runtime dependencies that we need. In case you're not running PostgreSQL as your database, you could remove this completely.
In case you need more runtime dependencies, you would specify them here. We also remove the package list to keep the image size down.

```dockerfile
RUN useradd -U appuser \
    && install -d -m 0755 -o appuser -g appuser /app/staticfiles \
    && install -d -m 0755 -o appuser -g appuser /app/media
```

It is recommended to run Docker containers as a non-root user. 
So we create a user called `appuser` and create the directories for the static files and media files with the correct permissions.

```dockerfile 
WORKDIR /app
COPY --chown=appuser:appuser . .
```

We set the working directory to `/app` and copy the actual project files to the container.
We also set the owner of the files to `appuser` to ensure we don't have any permission issues.

```dockerfile
USER appuser:appuser
```

This line sets the user to `appuser` so that the application runs as this user.

```dockerfile
RUN python manage.py collectstatic --noinput
```

Controversial, but if you are serving the static files from the Django application (e.g. using Whitenoise), it makes sense to embed the static files in the image.
This way, you don't have to worry about running `collectstatic` manually or in post-build script.

```dockerfile
ENTRYPOINT [ "/app/entrypoint.sh" ]
CMD [ "server" ]
```

This line sets the entrypoint for the container and runs the `server` command by default. I will elaborate on the `entrypoint.sh` script in the next section.

## Entrypoint

This is the `entrypoint.sh` script that I usually use. It is quite simple and only accepts the `server` command as an argument.

```bash
#!/bin/bash

PROCESS_TYPE=$1
echo "Running process type: $PROCESS_TYPE"

if [ "$PROCESS_TYPE" = "server" ]; then
    exec gunicorn --bind 0.0.0.0:8000 --log-level INFO --access-logfile "-" --error-logfile "-" app.wsgi
else
    echo "Unknown process type: $PROCESS_TYPE"
fi
```

In the very basic scenario, you could definitely just replace it with the `CMD` instruction in the Dockerfile, but I like to keep it separate for flexibility.

This flexibility comes useful quickly if you would like to Dockerize a Celery worker or a management command, for example.
You could also add more commands to the script, like running migrations before starting the server.

## Summary

There's really no one-size-fits-all Dockerfile for Django projects, but this is as close as I've gotten to something that works most of the time
and if it doesn't, it's still a great starting point.  
