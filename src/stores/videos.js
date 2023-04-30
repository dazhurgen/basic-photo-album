
import { defineStore } from 'pinia'
import axios from "axios";
import { collection, onSnapshot, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase'
const apiUrl = import.meta.env.VITE_YT_API_URL

export const useVideosStore = defineStore({
  id:'videos',
  state:() =>({
    videosList : [],
    currentUser : ''
  }),
  actions:{
    async getVideoDataFromUrl ( videoLink ) {
      alert(apiUrl)
       let videoId = (new URL( videoLink )).searchParams.get('v');;
      let data = await axios.get(import.meta.env.VITE_YT_API_URL+videoId+'&key='+import.meta.env.VITE_YT_API_KEY+'&part=snippet')
      return {
          id:data.data.items[0].id,
          title:data.data.items[0].snippet.title,
          description:data.data.items[0].snippet.description,
          publishedAt:data.data.items[0].snippet.publishedAt,
          thumbnails:data.data.items[0].snippet.thumbnails
      }
    },
     getVideoList() {

       onSnapshot(collection(db, "videos"), (querySnapshot) => {
        this.videosList = []
        querySnapshot.forEach((doc) => {
          this.videosList.push(doc.data())
        });
      })
    },
    async addVideo( videoData ) {
      await setDoc(doc(db, "videos", videoData.id), videoData);
      return {done:1}
    },
    deleteVideo(id ) {
       deleteDoc (doc(db, "videos", id))
    }
  }
})