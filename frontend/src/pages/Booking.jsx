import React, { useState, useContext } from 'react'
import { Form, FormGroup, Button } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../utils/config'
import '../styles/booking.css'

const Booking = ({ tour }) => {
   const { user } = useContext(AuthContext)
   const navigate = useNavigate()

   const [booking, setBooking] = useState({
      userId: user?._id,
      userEmail: user?.email,
      tourName: tour?.title,
      fullName: '',
      phone: '',
      guestSize: 1,
      bookAt: ''
   })

   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null)

   const handleChange = e => {
      setBooking(prev => ({ ...prev, [e.target.id]: e.target.value }))
      setError(null)
   }

   const handleSubmit = async e => {
      e.preventDefault()
      setLoading(true)
      setError(null)

      try {
         if (!user || !user._id) {
            throw new Error('Please login to book a tour')
         }

         // Log the request details for debugging
         console.log('Making booking request to:', `${BASE_URL}/booking`)
         console.log('Request body:', booking)

         const res = await fetch(`${BASE_URL}/booking`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(booking)
         })

         // Log the response for debugging
         console.log('Response status:', res.status)
         const responseText = await res.text()
         console.log('Response text:', responseText)

         let result
         try {
            result = JSON.parse(responseText)
         } catch (err) {
            console.error('Failed to parse response:', err)
            throw new Error('Server returned invalid response')
         }

         if (!res.ok) {
            throw new Error(result.message || 'Failed to book tour')
         }

         setLoading(false)
         navigate('/thank-you')
      } catch (err) {
         setLoading(false)
         setError(err.message)
         console.error('Booking error:', err)
      }
   }

   return (
      <section>
         <div className="booking__info">
            <h5>Booking Information</h5>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form className="booking__info-form" onSubmit={handleSubmit}>
               <FormGroup>
                  <input
                     type="text"
                     placeholder="Full Name"
                     id="fullName"
                     value={booking.fullName}
                     onChange={handleChange}
                     required
                  />
               </FormGroup>
               <FormGroup>
                  <input
                     type="number"
                     placeholder="Phone"
                     id="phone"
                     value={booking.phone}
                     onChange={handleChange}
                     required
                  />
               </FormGroup>
               <FormGroup className="d-flex align-items-center gap-5">
                  <input
                     type="date"
                     placeholder=""
                     id="bookAt"
                     value={booking.bookAt}
                     onChange={handleChange}
                     required
                  />
                  <input
                     type="number"
                     placeholder="Guest"
                     id="guestSize"
                     value={booking.guestSize}
                     onChange={handleChange}
                     min="1"
                     required
                  />
               </FormGroup>
               <Button 
                  className="btn primary__btn w-100 mt-4" 
                  disabled={loading}
               >
                  {loading ? "Booking..." : "Book Now"}
               </Button>
            </Form>
         </div>
      </section>
   )
}

export default Booking 