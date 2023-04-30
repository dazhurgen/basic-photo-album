<template>
  <div>
    <v-toolbar color="#304FFE" dark>
      <v-toolbar-title dark style="color:white; font-weight:600;">Photo Album</v-toolbar-title>
    </v-toolbar>
    <v-row justify="center" class="pt-12">
      <v-col cols="12" sm="10" md="8" lg="10">
        <v-container fluid>
          <v-row>
            <v-col>
              <v-text-field
              label="Escriba o pegue el link del video"
                outlined
                dense
                v-model="videoLinkInput"
                :loading="buttonLoading"
                class="search-input"
              >
                <template v-slot:append>
                  <v-btn
                    color="#304FFE"
                    dark
                    style="color:white; font-weight:400;"
                    :disabled="!validUrl" 
                    @click="addVideo()" 
                    :loading="buttonLoading"
                  >
                    Agregar
                  </v-btn>
                </template>
              </v-text-field>
              <v-row  justify="left" no-gutters>
                <v-col lg="4" class="pa-0">
                  <v-alert icon="mdi-alert" text="invalidUrl" variant="outlined" v-if="showHint"  type="warning"></v-alert>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              v-for="(video, index) in videoStore.videosList"
              :key="index"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
            <v-card @click="getVideoDetails( video )">
              <v-img
              
                :src="video.thumbnails.standard.url"
                class="align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                
                cover
              >
                <v-card-title class="text-white" >{{video.title}}</v-card-title>
              </v-img>
            </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <v-dialog v-model="alertDialog">
      <v-card max-width="350" class="mx-auto">
      <v-card-title class="text-center">
        <v-layout align-center>
          <v-row>
            <v-col cols="12">
              <v-icon color="#FDD835" style="font-size:100px">mdi-alert-circle</v-icon>
            </v-col>
            <v-col>
              <span class="headline">Aviso</span>
            </v-col>
          </v-row>
        </v-layout>
      </v-card-title>
      <v-card-text>
        <div class="text-center">
          {{ alertMessage }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn  color="#1565C0" variant="elevated" style="color:white" @click="closeAlertDialog()">OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
    </v-dialog>
    
    <v-dialog v-model="detailsDialog" width="auto" persistent >
   
      <video-details-component :data="videoData" :type="videoModalType" @watch-video="watchVideo()" @close-dialog="closeDialog()" @save-video="saveVideo()" @delete-video="deleteVideo()"></video-details-component>
  
    </v-dialog> 
  </div>
  
</template>

<script setup>
  import { computed, ref, onMounted } from 'vue';
  import { useVideosStore } from '../stores/videos.js'
  import videoDetailsComponent from '../components/videoDetailsComponent.vue';
  

  const videoStore = useVideosStore()
  const videoLinkInput = ref( '' )
  const videoModalType = ref('')
  const buttonLoading = ref( false )
  const detailsDialog = ref( false )
  const videoData = ref( null )
  const alertDialog = ref( null )
  const alertMessage = ref( '' )
    
  onMounted(()=>{
     videoStore.getVideoList()
  })

  const showAlertDialog = ( message )=>{
    alertDialog.value = true
    buttonLoading.value = false
    detailsDialog.value = false
    videoLinkInput.value = ''
    alertMessage.value = message
  }
  const closeAlertDialog = ()=>{
    alertDialog.value = false
    closeDialog()
  }
  const validUrl = computed(()=> {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    var match = videoLinkInput.value.match(regExp);
    if (match && match[2].length == 11) 
      return true   
     else
      return false
    
  })
  const  hasId = function(id){
    return videoStore.videosList.some(e => e.id === id);
};
  const emptyInput = computed(()=> {
    if( !validUrl.value && videoLinkInput.value !== '' )

      return false
     else
      return true
  })
  const showHint = computed(()=>{
    if( !validUrl.value && !emptyInput.value)
      return true
      else
      return false
  })
  const  addVideo = async ()=>{
      buttonLoading.value = true
        try{
          videoData.value = await videoStore.getVideoDataFromUrl(videoLinkInput.value)
          console.log('done')
          if( hasId( videoData.value.id ) ){
            showAlertDialog( 'Este video ya esta en el album!' )
            return
          }
          videoModalType.value = 'add'
          detailsDialog.value = true;
        } catch(e){
          showAlertDialog( 'Link invalido!' )
          console.log(e)
        }
  }
  const closeDialog = ()=> {
    buttonLoading.value = false
    detailsDialog.value = false
    videoLinkInput.value = ''
  }

  const getVideoDetails = ( data ) =>{
    videoData.value = data
    videoModalType.value = 'details'
    detailsDialog.value = true;
  }
  const deleteVideo = ( )=>{
    videoStore.deleteVideo(videoData.value.id)
    closeDialog()
  }
  const saveVideo = async() =>{
    const saveResult = await videoStore.addVideo(videoData.value)
    closeDialog()
  }
</script>

<style scoped>
.search-input ::v-deep .v-input__icon--append .v-btn__content {
  color: white;
}
</style>
