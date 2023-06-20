import axios from 'axios'

const API_URL = 'https://master-7rqtwti-yj2le3kr2yhmu.uk-1.platformsh.site'

const api = axios.create({
  baseURL: API_URL,
})

const apiService = {
  // Create Recipe
  createRecipe: async (data) => {
    try {
      const response = await api.post('/yumazoo/recipes', data)
      return response.data
    } catch (error) {
      const errorData = error.response.data
      if (errorData.detail && Array.isArray(errorData.detail)) {
        const errorMessages = errorData.detail.map((error) => `${error.loc[1].toUpperCase()}:${error.msg}`)
        throw new Error(errorMessages)
      } else {
        throw new Error('Error:', error.message)
      }
    }
  },

  // Get Recipes
  getRecipes: async () => {
    try {
      const response = await api.get('/yumazoo/recipes')
      return response.data
    } catch (error) {
      throw new Error(error.response.data.error)
    }
  },

  // Get Recipe Number
  getRecipeNumber: async () => {
    try {
      const response = await api.get('/yumazoo/recipes/number')
      return response.data
    } catch (error) {
      throw new Error(error.response.data.error)
    }
  },

  // Get Recipe
  getRecipe: async (index) => {
    try {
      const response = await api.get(`/yumazoo/recipes/${index}`)
      return response.data
    } catch (error) {
      throw new Error(error.response.data.error)
    }
  },
}

export default apiService
