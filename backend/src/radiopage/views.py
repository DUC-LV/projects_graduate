from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.http import HttpResponse
from streamings.models import Streamings
from streamings.serializers import StreamingSerializers
from podcasts.models import PodCastCategory, TopicPodCast, PodCastOfTopic
from podcasts.serializers import PodCastCategorySerializers, PodCastSerializers


# Create your views here.
class RadioPageAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):

        items = []

        # streamings

        streaming = Streamings.objects.all()
        streaming_data = []

        for st in streaming:
            streaming_data.append(StreamingSerializers(st).data)

        res_streaming = {
            "sectionType": "livestream",
            "viewType": "slider",
            "title": "",
            "link": "",
            "sectionId": "radHot",
            "items": streaming_data
        }

        items.append(res_streaming)

        # Podcast Category

        podcast_category = PodCastCategory.objects.all()
        podcast_category_data = []

        for pc in podcast_category:
            podcast_category_data.append(PodCastCategorySerializers(pc).data)

        res_category_podcast = {
            "sectionType": "podcast_category",
            "viewType": "slider",
            "title": "Thể loại podcast",
            "link": "",
            "sectionId": "radPromoteCategory",
            "items": podcast_category_data
        }

        items.append(res_category_podcast)

        # podcast
        topic_pc = TopicPodCast.objects.all()
        topic_podcast = PodCastOfTopic.objects.filter(topic__in=topic_pc)
        topic_podcast_map = {}

        for tp_pc in topic_podcast:
            podcast = tp_pc.podcast
            podcast_map = topic_podcast_map.get(tp_pc.topic_id, None)
            podcast_data = PodCastSerializers(podcast).data
            if podcast_map is None:
                topic_podcast_map[tp_pc.topic_id] = [podcast_data]
            else:
                topic_podcast_map[tp_pc.topic_id].append(podcast_data)

        res_podcast = []
        for topic in topic_pc:
            res_podcast.append({
                "sectionType": "podcastH",
                "viewType": "slider",
                "title": topic.title,
                "link": "",
                "sectionId": "radSponsoredProgram",
                "items": topic_podcast_map[topic.id]
            })

        for i in range(len(res_podcast)):
            items.append(res_podcast[i])

        # res_home_radio

        res = {
            "err": 0,
            "msg": "Success",
            "data": {
                "items": items,
                "hasMore": "true",
                "total": len(items)
            }
        }
        return Response(res)
