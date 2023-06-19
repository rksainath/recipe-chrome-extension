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
      throw new Error(error.response.data.error)
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
