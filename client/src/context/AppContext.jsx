import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

const AppContext = createContext()

export const AppContextProvider = ({ children }) => {

    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [token, setToken] = useState(localStorage.getItem('token') || null)
    const [loadingUser, setLoadingUser] = useState(true)

    const fetchUser = async () => {
        if (!token) {
            setLoadingUser(false)
            return
        }
        try {
            const { data } = await axios.get('/api/user/data', { headers: { Authorization: token } })
            if (data.success) {
                setUser(data.user)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoadingUser(false)
        }
    }

    const createNewChat = async () => {
        try {
            if (!user) return toast('Login to create a new chat')
            navigate('/')
            const { data } = await axios.get('/api/chat/create', { headers: { Authorization: token } })
            if (data.success) {
                toast.success('New chat created')
            }
            await fetchUsersChats()
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchUsersChats = async () => {
        try {
            const { data } = await axios.get('/api/chat/get', { headers: { Authorization: token } })
            if (data.success) {
                setChats(data.chats)
                if (data.chats.length === 0) {
                    await createNewChat();
                    return fetchUsersChats()
                } else {
                    setSelectedChat(data.chats[0])
                }
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const deleteChat = async (chatId) => {
        try {
            const { data } = await axios.post('/api/chat/delete', { chatId }, { headers: { Authorization: token } })
            if (data.success) {
                toast.success('Chat deleted')
                await fetchUsersChats()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const logout = () => {
        setToken(null)
        setUser(null)
        localStorage.removeItem('token')
        toast.success('Logged out successfully')
        navigate('/login')
    }

    const purchasePlan = async (planId) => {
        try {
            if (!user) return toast.error('Login to purchase credits')
            const { data } = await axios.post('/api/credit/purchase', { planId }, { headers: { Authorization: token } })
            if (data.success) {
                toast.success('Redirecting to payment...')
                window.location.href = data.url
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message || 'Failed to process purchase')
        }
    }

    useEffect(()=>{
       if(theme === 'dark'){
          document.documentElement.classList.add('dark');
       }else{
        document.documentElement.classList.remove('dark');
       }
       localStorage.setItem('theme', theme)
    },[theme])

    useEffect(() => {
        if (user) {
            fetchUsersChats()
        }
        else {
            setChats([])
            setSelectedChat(null)
        }
    }, [user])

    useEffect(() => {
        if (token) {
            fetchUser()
        } else {
            setUser(null)
            setLoadingUser(false)
        }
    }, [token])

    const value = {
        navigate, user, setUser, fetchUser, chats, setChats, selectedChat, setSelectedChat, theme, setTheme, createNewChat, loadingUser, fetchUsersChats, token, setToken, axios, deleteChat, logout, purchasePlan
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)