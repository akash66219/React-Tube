import { createContext, useState } from "react";
import { useContext } from "react";
import {firebaseApp}  from './firebase'
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth'
import {getDatabase,ref,set,get,child} from 'firebase/database'
 
const AppContext = createContext()
export const auth = getAuth(firebaseApp)
const db = getDatabase(firebaseApp)

let AppContextProvider = ({children}) => {
    const googleProvider = new GoogleAuthProvider();
    let [isSidebarOpen, setSidebarOpen] = useState(true)
    let [user, setUser] = useState(null)
    let [savedVideos, setSavedVideos] = useState([])
    let [subscriptions, setsubscriptions] = useState([])
    const [category, setCategory] = useState('New');

    const setCategoryHandler = async(val) => {
        setCategory(val)
        if(!user) return ;
        return set(ref(db,`${user.uid}/category`), val)
    }

    const fetchCategory = async() => {
        if(!user) return ;
        get(child(ref(db), `${user.uid}/category`))
        .then(snapshot => {
            setCategory(snapshot.val())
        })
    }

    const signupWithGoogle = async() => {
        signInWithPopup(auth, googleProvider)
        .then((result) => { 
            console.log("Login Successfull")
            setUser(result.user)
        }).catch(err => {
            console.log(err)
        })
    }

    const signOutUser = async() => {
        return signOut(auth).then((res) => {
          console.log('Logout Successfull')
          setUser(null)
        }).catch(err => {
          console.log(err)
        })
    }
    
    const fetchSavedVideo = async() => {
        if(!user) return ;
        get(child(ref(db), `${user.uid}/starred`))
        .then((snapshot) => {
            let vids = snapshot.val().map(video => video)
            setSavedVideos(vids)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const fetchSubscription = async() => {
        if(!user) return ;
        get(child(ref(db), `${user.uid}/subscriptions`))
        .then((snapshot) => {
            let subscription = snapshot.val().map(subs => subs)
            setsubscriptions(subscription)
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    const saveVideo = async(newVideo) => {
        if(!user) return ;
        let videoExist = savedVideos.some(video => video.videoId === newVideo.videoId)
        if(videoExist) return ;
        let newVideos = [...savedVideos, newVideo]
        setSavedVideos(newVideos)
        await set(ref(db, `${user.uid}/starred`), newVideos)
    }

    const saveSubscription = async(newChannel) => {
        if(!user) return ;
        let channelExist = subscriptions.some(channel => channel.channelId === newChannel.channelId)
        if(channelExist) return ;
        let newChannels = [...subscriptions, newChannel]
        setsubscriptions(newChannels)
        await set(ref(db, `${user.uid}/subscriptions`), newChannels)
    }
    
    const deleteVideo = async(videoId) => {
        if(!user) return ;
        if(savedVideos.length === 0) return ;
        let index = savedVideos.findIndex(video => video.videoId === videoId)
        if(index !== -1){
            let newVideos = savedVideos.filter(video => video.videoId !== videoId)
            setSavedVideos(newVideos)
            await set(ref(db, `${user.uid}/starred`), newVideos)
        }
    }

    const removeSubscription = async(channelId) => {
        if(!user) return ;
        if(subscriptions.length === 0) return ;
        let index = subscriptions.findIndex(channel => channel.channelId === channelId)
        if(index !== -1){
            let newChannels = subscriptions.filter(channel => channel.channelId !== channelId)
            setsubscriptions(newChannels)
            await set(ref(db, `${user.uid}/subscriptions`), newChannels)
        }
    }

    return (
        <AppContext.Provider value={{
            isSidebarOpen,
            setSidebarOpen,
            signupWithGoogle,
            signOutUser,
            user,
            setUser,
            savedVideos,
            setSavedVideos,
            category,
            setCategory,
            setCategoryHandler,
            fetchCategory,
            deleteVideo,
            saveVideo,
            fetchSavedVideo,
            subscriptions,
            saveSubscription,
            removeSubscription,
            fetchSubscription
            }} >
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider

export const useAppContext = () => useContext(AppContext)