from djoser import email

# /Users/anakuprianova/chunkitapp/chunkitapp2.0/chunkitapp/templates/experiment/activation.html
class ActivationEmail(email.ActivationEmail):
    template_name = 'experiment/activation.html'
