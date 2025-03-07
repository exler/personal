---
title: Django admin tricks I commonly use
keywords: [django, python]
date: 2025-03-07
---

## Introduction

The Django admin site is one of the best features that Django provides. It's useful during the development process to manage the database data in a simplified (or enhanced) manner, as well as in production environment, where it provides a simple interface for the content managers to manage the data.

Despite its simplicity, the Django admin site is extensible, although not always in a very obvious way. Nevertheless, it is a common pattern across many projects, I've seen, to actually extend the Django admin site as much as possible if most of your application is CRUD based. I've seen this done to an extent that the admin site was exposed to public customers as the main interface to the application.

## Django admin tricks

Here are a couple of Django tricks / hidden features that I commonly use to modify the Django admin page and make it even more powerful!

### Disabling editing/deleting capabilities

Usually you want to be able to modify according to their user permissions. Sometimes (and I see this in a lot of projects) you either roll out your own permission system and forget about the Django permissions, give content managers the `is_superuser` flag or simply want to completely prohibit users from deleting certain objects, no matter what. In this case, overriding the `has_*_permission` [(documentation)](https://docs.djangoproject.com/en/5.1/ref/contrib/admin/#django.contrib.admin.ModelAdmin.has_add_permission) is what you want to do:

```python
from django.contrib import admin

class CustomModelAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        # Disables the possibility of adding a new object
        return False

    def has_change_permission(self, request, obj=None):
        # Disables the possibility of updating an object
        return False

    def has_delete_permission(self, request, obj=None):
        # Disables the possibility of deleting an object
        return False
```

Of course, you can modify this to fit your requirements, like a separate permission system. But who has time for that, right?

![Deadlines, deadlines everywhere](/images/django-admin-tricks/deadlines.jpg)

### Adding extra pages

Django Admin is great because it's automatically generated based on the registered models. But sometimes you just need to squeeze this extra dashboard page or a form that doesn't really link with any of the models. In that case, let me introduce you `ModelAdmin.get_urls()` [(documentation)](https://docs.djangoproject.com/en/5.1/ref/contrib/admin/#django.contrib.admin.ModelAdmin.get_urls):

```python
from django.contrib import admin
from django.template.response import TemplateResponse
from django.urls import path


class CustomModelAdmin(admin.ModelAdmin):
    def get_urls(self):
        urls = super().get_urls()
        # Custom URL list
        # Make sure to wrap your view in `self.admin_site.admin_view()`
        # to avoid caching the view (unless you want it to be cached, then you can use `cacheable=True`)
        # and to have proper permission checks in place.
        my_urls = [path("my_view/", self.admin_site.admin_view(self.my_view))]
        return my_urls + urls

    def my_view(self, request):
        if request.method == "GET":
            context = dict(
                # Include common variables for rendering the admin template.
                self.admin_site.each_context(request),
                # Your custom context
                key=value,
            )
            return TemplateResponse(request, "sometemplate.html", context)
        else:
            # Handle POST requests in case you have a form or want to take an action
            pass
```

And your custom template should most likely inherit from the `admin/base_site.html` template, to be consistent with the rest of the admin site.
```html
{% extends "admin/base_site.html" %}
{% block content %}
...
{% endblock %}
```

Now you have a page ready that you can navigate to and perform operations on. But how to navigate to that page, you ask? Well, now it's only navigable by typing the URL directly, but you can modify the `change_form.html` and `change_list.html` templates to include a link to your custom page.

Here's an example on the `change_form.html` template:

```html
{% extends "admin/change_form.html" %}
{% block object-tools-items %}
    <li>
        <a href="{% url 'admin:fill-automagically-'|add:opts.app_label|add:'-'|add:opts.model_name original.pk %}">Fill Automagically</a>
    </li>
    {{ block.super }}
{% endblock object-tools-items %}
```

![New button on the change form](/images/django-admin-tricks/change_form_html.png)

And here's an example from another project on the `change_list.html` template:
```html
{% extends "admin/change_list.html" %}
{% block object-tools-items %}
    <li>
        <a style="background: #ffffbb; color: #000" 
            href="{% url 'admin:accommodations-import' %}">Zaimportuj CSV</a>
    </li>
    {{ block.super }}
{% endblock object-tools-items %}
```

![New button on the change list](/images/django-admin-tricks/change_list_html.png)

They are both very similar, but we extend other base templates and in the first example, we use the app label and model name to reverse the URL. If you want your template to be more reusable, then this would be the recommended approach. Otherwise, the second one is simpler.

You can either override the templates by using the same names as per [the Django documentation](https://docs.djangoproject.com/en/5.1/ref/contrib/admin/#templates-which-may-be-overridden-per-app-or-model), or you can specify the templates in the `ModelAdmin` class:

```python
class CustomModelAdmin(admin.ModelAdmin):
    change_list_template = "yourapp/admin/custom_change_list.html"
    change_form_template = "yourapp/admin/custom_change_form.html"
```

### Improving performance with `raw_id_fields`, `list_select_related` and `autocomplete_fields`

Even if your admin panel is not customer facing, it does not mean that you should not care about performance. Quite the opposite actually! It would be a shame to see your admin panel become completely unusable or block a worker for an extended period of time because you forgot to get rid of those pesky N+1 queries. This is why it's important to know how to manage the performance of your admin panel.

#### `raw_id_fields`

By default, Django provides you with a select-box interface for your `ForeignKey` fields, filled with all the objects from the other table. Not only is this not always useful (are you really going to hand-select an item from a select-box containing a couple of millions of items?) it also means you have to fetch all the related instances and render them. This oftentimes results in a timeout, especially if you have a couple of those fields on the same page.

By using `raw_id_fields` [(documentation)](https://docs.djangoproject.com/en/5.1/ref/contrib/admin/#django.contrib.admin.ModelAdmin.raw_id_fields), you only show the actual foreign key value (in most cases the ID) and a representation of the object (if it's filled out and saved).

```python
class CustomModelAdmin(admin.ModelAdmin):
    raw_id_fields = ["parent"]
```

#### `list_select_related` or `get_list_select_related`

Your admin page can also show values from the related models. While this lookup is fairly quick on the detail page, on the list page it can quickly deteriorate the performance of your admin panel by introducing an [N+1 query problem](https://adamj.eu/tech/2020/09/01/django-and-the-n-plus-one-queries-problem/).

By using `list_select_related` [(documentation)](https://docs.djangoproject.com/en/5.1/ref/contrib/admin/#django.contrib.admin.ModelAdmin.list_select_related), you can specify which fields should have their related-object data fetched in the same query as the main object.

```python
class CustomModelAdmin(admin.ModelAdmin):
    list_select_related = ["parent"]

    # Or if you need to add some conditions
    def get_list_select_related(self, request):
        if request.user.is_superuser:
            # Maybe the user sees more fields than the regular staff user
            # so we fetch more related objects
            return ["parent", "extra_obj"]
        
        return ["parent"]
```

#### `autocomplete_fields`

Remember `raw_id_fields` from before? It's great if you mostly use the admin field to view the value or know the IDs of the objects. But what if you're trying to edit the field, and you need to look up the object? Enter `autocomplete_fields` [(documentation)](https://docs.djangoproject.com/en/5.1/ref/contrib/admin/#django.contrib.admin.ModelAdmin.autocomplete_fields)!

This replaces the select-box with a Select2 autocomplete input, that you can search in and it asynchronously fetches the related objects. Great for performance AND usability!

```python
class CustomModelAdmin(admin.ModelAdmin):
    autocomplete_fields = ["parent"]
```

## Summary

Hopefully this article gave you an idea on how the Django admin panel can be extended and adjusted to your specific needs. Make sure to read through the [Django documentation on the admin site](https://docs.djangoproject.com/en/5.1/ref/contrib/admin/) to learn more about cool features like [inline admin](https://docs.djangoproject.com/en/5.1/ref/contrib/admin/#inlinemodeladmin-objects) or [password reset for admin users](https://docs.djangoproject.com/en/5.1/ref/contrib/admin/#adding-a-password-reset-feature).
