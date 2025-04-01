import React, { useState, useRef, useEffect, useContext } from 'react'
import '../styles/tour-details.css'
// import tourData from '../assets/data/tours'
import { Container, Row, Col, Form, ListGroup, Button, FormGroup } from 'reactstrap'
import { useParams, useNavigate } from 'react-router-dom'
import calculateAvgRating from '../utils/avgRating'
import avatar from '../assets/images/avatar.jpg'
import Newsletter from '../shared/Newsletter'
import useFetch from '../hooks/useFetch'
import { BASE_URL } from '../utils/config'
import { AuthContext } from '../context/AuthContext'

const TourDetails = () => {
   const { id } = useParams()
   const navigate = useNavigate()
   const reviewMsgRef = useRef('')
   const [tourRating, setTourRating] = useState(null)
   const { user } = useContext(AuthContext)

   // fetch data from database
   const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`)

   const { photo, title, desc, price, reviews, city, address, distance, maxGroupSize } = tour

   const { totalRating, avgRating } = calculateAvgRating(reviews)

   const options = { day: 'numeric', month: 'long', year: 'numeric' }

   const submitHandler = async e => {
      e.preventDefault()
      const reviewText = reviewMsgRef.current.value

      try {
         if (!user || user === undefined || user === null) {
            alert('Please sign in')
         }
         const reviewObj = {
            username: user?.username,
            reviewText,
            rating: tourRating
         }

         const res = await fetch(`${BASE_URL}/review/${id}`, {
            method: 'post',
            headers: {
               'content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(reviewObj)
         })

         const result = await res.json()

         if (!res.ok) {
            return alert(result.message)
         }

         alert('Review submitted')
         window.location.reload()
      } catch (error) {
         alert(error.message)
      }
   }

   const handleBooking = () => {
      if (!user) {
         alert('Please sign in to book a tour')
         navigate('/login')
         return
      }
      navigate(`/booking/${id}`)
   }

   useEffect(() => {
      window.scrollTo(0, 0)
   }, [tour])

   return (
      <>
         <section>
            <Container>
               {loading && <h4 className='text-center pt-5'>Loading.........</h4>}
               {error && <h4 className='text-center pt-5'>{error}</h4>}
               {
                  !loading && !error && <Row>
                     <Col lg='8'>
                        <div className="tour__content">
                           <img src={photo} alt='tour-img' />

                           <div className="tour__info">
                              <h2>{title}</h2>
                              <div className="d-flex align-items-center gap-5">
                                 <span className="tour__rating d-flex align-items-center gap-1">
                                    <i className='ri-star-fill' style={{ 'color': 'var(--secondary-color)' }}></i> {avgRating === 0 ? null : avgRating}
                                    {totalRating === 0 ? ('Not rated') : (<span>({reviews?.length})</span>)}
                                 </span>

                                 <span><i className='ri-map-pin-fill'></i> {address}</span>
                              </div>

                              <div className="tour__extra-details">
                                 <span><i className='ri-map-pin-2-line'></i> {city}</span>
                                 <span><i className='ri-money-dollar-circle-line'></i> ${price} /per person</span>
                                 <span><i className='ri-map-pin-time-line'></i> {distance} k/m</span>
                                 <span><i className='ri-group-line'></i> {maxGroupSize} people</span>
                              </div>
                              <h5>Description</h5>
                              <p>{desc}</p>
                           </div>
                           <div className="tour__reviews mt-4">
                              <h4>Tour Reviews</h4>

                              <Form onSubmit={submitHandler}>
                                 <div className="review__input">
                                    <input type="text" ref={reviewMsgRef} placeholder='share your thoughts'
                                       required />
                                    <Button className='btn primary__btn text-white' type='submit'>
                                       Submit
                                    </Button>
                                 </div>
                                 <FormGroup className='d-flex align-items-center gap-3 mb-4 rating__group'>
                                    <span onClick={() => setTourRating(1)}>1 <i className='ri-star-s-fill'></i></span>
                                    <span onClick={() => setTourRating(2)}>2 <i className='ri-star-s-fill'></i></span>
                                    <span onClick={() => setTourRating(3)}>3 <i className='ri-star-s-fill'></i></span>
                                    <span onClick={() => setTourRating(4)}>4 <i className='ri-star-s-fill'></i></span>
                                    <span onClick={() => setTourRating(5)}>5 <i className='ri-star-s-fill'></i></span>
                                 </FormGroup>
                              </Form>

                              <ListGroup className='user__reviews'>
                                 {
                                    reviews?.map(review => (
                                       <div className='review__item'>
                                          <img src={avatar} alt='' />

                                          <div className='w-100'>
                                             <div className='d-flex align-items-center justify-content-between'>
                                                <div>
                                                   <h5>{review.username}</h5>
                                                   <p>{new Date(review.createdAt).toLocaleDateString('en-US', options)}</p>
                                                </div>
                                                <span className='d-flex align-items-center'>
                                                   {review.rating} <i className='ri-star-s-fill'></i>
                                                </span>
                                             </div>

                                             <h6>{review.reviewText}</h6>
                                          </div>
                                       </div>
                                    ))
                                 }
                              </ListGroup>
                           </div>
                        </div>
                     </Col>

                     <Col lg='4'>
                        <div className="booking">
                           <div className="booking__top d-flex align-items-center justify-content-between">
                              <h3>${price}<span>/per person</span></h3>
                              <span className='tour__rating d-flex align-items-center gap-1'>
                                 <i className='ri-star-fill'></i>
                                 {avgRating === 0 ? null : avgRating}
                                 {totalRating === 0 ? 'Not rated' : <span>({reviews?.length})</span>}
                              </span>
                           </div>

                           {/* =============== BOOKING FORM START=============== */}
                           <div className="booking__form">
                              <h5>Information</h5>
                              <Form className='booking__info-form'>
                                 <FormGroup className='d-flex align-items-center gap-3 w-100'>
                                    <input type="text" placeholder='Full Name' required />
                                    <input type="text" placeholder='Phone' required />
                                 </FormGroup>
                                 <FormGroup className='d-flex align-items-center gap-3 w-100 mt-3'>
                                    <input type="date" placeholder='' required />
                                    <input type="number" placeholder='Guest' required />
                                 </FormGroup>
                              </Form>
                           </div>
                           {/* =============== BOOKING FORM END=============== */}

                           <Button className='btn primary__btn w-100 mt-4' onClick={handleBooking}>Book Now</Button>
                        </div>
                     </Col>
                  </Row>
               }
            </Container>
         </section>
         <Newsletter />
      </>
   )
}

export default TourDetails