import { defineStore } from 'pinia'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '@/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useToast } from 'vue-toastification'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isLoggedIn: false,
    userName: '',
    userRole: '',
    userEmail: ''
  }),
  actions: {
    async login(email, password, router) {
      const toast = useToast()
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        this.user = userCredential.user
        this.isLoggedIn = true

        const userDoc = await getDoc(doc(db, 'users', email))
        if (userDoc.exists()) {
          const userData = userDoc.data()
          this.userName = userData.username
          this.userEmail = userData.email
          this.userRole = userData.role
        }

        toast.success('Login successful!')
        router.push('/')
      } catch (error) {
        console.error('Login error:', error.message)
        toast.error(
          `${error.message.includes('auth') ? 'Error: ' + error.message.split(' ')[2] : 'An unknown error occurred. Please try again.'}`
        )
      }
    },

    async signUp(email, password, username, role, router) {
      const toast = useToast()
      try {
        // Create a user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user

        // Prepare the Firestore document data
        const userData = {
          email: user.email,
          username: username,
          role: role,
          createdAt: new Date()
        }

        // If the role is 'Employer', add an empty jobs array
        if (role === 'Employer') {
          userData.jobs = []
        }

        // Save the user details to Firestore
        await setDoc(doc(db, 'users', email), userData)

        this.user = user
        this.userName = userData.username
        this.userEmail = userData.email
        this.userRole = userData.role

        this.isLoggedIn = true
        toast.success('Sign up successful!')
        router.push('/')
      } catch (error) {
        console.error('Sign up error:', error.message)
        toast.error(
          `${error.message.includes('auth') ? 'Error: ' + error.message.split(' ')[2] : 'An unknown error occurred. Please try again.'}`
        )
      }
    },
    logout() {
      this.isLoggedIn = false
      this.user = null
      this.userName = ''
      this.userEmail = ''
      this.userRole = ''
      auth.signOut()
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'auth',
        storage: localStorage
      }
    ]
  }
})
