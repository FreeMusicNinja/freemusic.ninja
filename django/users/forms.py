from django import forms
from django.contrib.auth.forms import ReadOnlyPasswordHashField

from .models import User


class UserCreationForm(forms.ModelForm):

    """
    Form for creating new users.

    Includes all the required fields, plus a repeated password.
    """

    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Password confirmation',
                                widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ('name', 'email')

    def clean_password2(self):
        """Check that the two passwords match."""
        password1 = self.cleaned_data.get('password1')
        password2 = self.cleaned_data.get('password2')
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        """Save the provided password in hashed format."""
        user = super().save(commit=False)
        user.set_password(self.cleaned_data['password1'])
        if commit:
            user.save()
        return user


class UserChangeForm(forms.ModelForm):

    """
    Form for updating users.

    Includes User fields, but replaces the password field
    with a password hash display field.
    """

    password = ReadOnlyPasswordHashField()

    class Meta:
        model = User
        fields = ('name', 'email', 'password', 'is_active', 'is_admin')

    def clean_password(self):
        """Return the initial value regardless of what the user provides."""
        return self.initial["password"]
