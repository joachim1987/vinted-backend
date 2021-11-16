const express = require('express')
const formidableMiddleware = require('express-formidable')
const cors = require('cors')
const stripe = require('stripe')(
  'sk_test_51JwTuNABMPdLCQCOk1flvJkqRkZ2br9ZdMNGq7sH5khAH9uiMyF8RZBU6YxSJu82hjFiZd4ypQpvA5uFqFIpiRV300IPMk1LTD',
)
const dotenv = require('dotenv')
const app = express()
app.use(formidableMiddleware())
app.use(cors())

app.post('/pay', async (req, res) => {
  // Réception du token créer via l'API Stripe depuis le Frontend
  const stripeToken = req.fields.stripeToken
  // Créer la transaction
  const response = await stripe.charges.create({
    amount: 2000,
    currency: 'eur',
    description: "La description de l'objet acheté",
    // On envoie ici le token
    source: stripeToken,
  })
  console.log(response.status)

  // TODO
  // Sauvegarder la transaction dans une BDD MongoDB

  res.json(response)
})

app.listen(3100, () => {
  console.log('Server started')
})
