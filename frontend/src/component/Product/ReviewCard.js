import React from 'react'
import { Rating } from "@material-ui/lab";
import userpng from "../../images/user.png"


const ReviewCard = ({review}) => {
    const options = {
       
        value: review.rating,
        readOnly: true,
        precision: 0.5,
      };
  return (
   <div className="reviewCard">
       <img src={userpng} alt="User" />
       <p>{review.name}</p>
       <Rating {...options}/>
       <span>{review.comment}</span>
   </div>
  )
}

export default ReviewCard