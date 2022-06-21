from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import include

urlpatterns = [
    path('noprolificid', views.noprolificid, name='noprolificid'),
    path('consent', views.consent, name='consent'),
    path('outline', views.outline, name='outline'),
    path('questionnaire/', views.questionnaire, name='questionnaire'),
    path('training1', views.training1, name='training1'),
    path('training2', views.training2, name='training2'),
    path('training3', views.training3, name='training3'),
    path('trainingcompleted', views.trainingcompleted, name='trainingcompleted'),
    path('challenge', views.challenge, name='challenge'),
    path('thanks', views.thanks, name='thanks'),
    path('data/', views.data),
    path('get_challenge', views.confirm, name='get_challenge'),
    path('taskcompleted', views.taskcompleted, name='taskcompleted'),
    path('sentence', views.sentence, name='sentence'),
    path('text/', views.text),
    path('feedback/', views.feedbackQ, name='feedback'),
    path('end', views.end, name='end'),
    path('passed', views.you_passed, name='passed'),
    path('results_data/<name>', views.results, name='results'),
    path('background_results/<name>', views.backgroundRES, name='background_results'),
    path('feedback_results/<name>', views.feedbackRES, name='feedback_results'),
    path('sentence_results/<name>', views.sentenceRES, name='sentence_results'),
    path('levi/<name>', views.levi, name='levi'),
    path('save_draft/', views.save_draft, name='save_draft'),
    path('load_draft/', views.load_draft, name='load_draft'),
    path('drafts_list/', views.drafts_list, name='drafts_list'),
    path('delete_draft/', views.delete_draft, name='delete_draft'),
    path('load_experement/<experement_name>', views.load_experement, name='load_experement'),
    path('load_draft_to_test/<draft_experement_name>', views.load_draft_to_test, name='load_draft_to_test'),
    path('secret/', views.secret, name='secret'),
    path('delete_experiment/', views.delete_experiment, name='delete_experiment'),
    path('stop_experiment/', views.stop_experiment, name='stop_experiment'),
    path('permutation/<name>', views.permutation, name='permutation')
]

urlpatterns += [
    path('accounts/', include('django.contrib.auth.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)