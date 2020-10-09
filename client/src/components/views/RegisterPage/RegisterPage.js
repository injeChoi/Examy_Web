import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom'
import Axios from 'axios';

function RegisterPage(props) {
  
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("")
  const [Name, setName] = useState("")
  const [Password, setPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")
  const [UserImage, setUserImage] = useState("")
  const [DBimage, setDBimage] = useState("")

  const onEmailHandler = (event) =>{
    setEmail(event.currentTarget.value)
  }
  const onNameHandler = (event) =>{
    setName(event.currentTarget.value)
  }
  const onPasswordHandler = (event) =>{ 
    setPassword(event.currentTarget.value)
  }
  const onConfirmPasswordHandler = (event) =>{
    setConfirmPassword(event.currentTarget.value)
  }

  const onUserImageHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('profile_img', event.target.files[0]);
    Axios.post('/api/users/upload', formData,{
      header: {'content-type' : 'multipart/form-data'},
    }).then((response) => {
      setDBimage(response.data.filename)
    })
    setUserImage(event.currentTarget.value)
  }

  const onSubmitHandler = (event) =>{
    // 계속 새로고침 방지
    event.preventDefault();
    
    if(Password !== ConfirmPassword){
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
    }
    let body = {
      email: Email,
      name: Name,
      password: Password,
      image: DBimage
    }

    dispatch(registerUser(body))
    .then(response => {
      if(response.payload.success){
          props.history.push("/login")
        } else{
          alert("Failed to sign up.")
        }
      })
  }

  return (
    <div style = {{
      display: 'flex', justifyContent: 'center', alignItems: 'center', width:'100%', height: '100vh'
    }}>

      <form style={{display: 'flex', flexDirection: 'column'}}
        onSubmit = {onSubmitHandler}>

        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />

        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <label>Confirm Password</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
        
        <label>User Image</label>
        <input type="file" accept='image/jpg, image/png, image/jpeg' value={UserImage} onChange={onUserImageHandler} /> 
        <br />
        <button>
          Register
        </button>
      </form>
    </div>
  )
}

export default withRouter(RegisterPage)