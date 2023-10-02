from django import forms
from curd.models import user_info
from django.core.validators import RegexValidator


class UserInfoForm(forms.ModelForm):
    class Meta:
        model = user_info
        fields = ['name', 'phone_number']
    
    phone_regex = RegexValidator(
        regex=r'^\+?88?\d{9,11}$',
        message="Phone number must be entered in the format: '+88'. Up to 11 digits allowed."
    )
    phone_number = forms.CharField(
        label='Phone Number',
        initial= '+880',
        validators=[phone_regex],
    )
