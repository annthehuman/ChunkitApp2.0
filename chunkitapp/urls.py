from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import include

urlpatterns = [
    path('get_all_prolific/<name>', views.get_all_prolific, name='get_all_prolific'),
    path('questionnaire/', views.questionnaire, name='questionnaire'),
    path('data/', views.data),
    path('text/', views.text),
    path('feedback/', views.feedbackQ, name='feedback'),
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
    path('stop_experiment/', views.stop_experiment, name='stop_experiment'),
    path('start_experiment/', views.start_experiment, name='start_experiment'),
    path('permutation/<name>', views.permutation, name='permutation')
]

urlpatterns += [
    path('accounts/', include('django.contrib.auth.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)