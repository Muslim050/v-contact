import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'

export function useRequestForm(fn) {
  const {isSubmitting, handleSubmit} = useForm({
    initialValues: {
      status: 'active'
    }
  })

  const {value: fio, errorMessage: fError, handleBlur: fBlur} = useField(
    'fio',
    yup.string()
      .trim()
      .required('Введите ФИО клиента')
  )
  const {value: phone, errorMessage: pError, handleBlur: pBlur} = useField(
    'phone',
    yup.string()
      .trim()
      .required('Телефон не может быть пустым')
  )
  const {value: email, errorMessage: eError, handleBlur: eBlur} = useField(
    'email',
    yup.string()
      .trim()
      .required('Email не может быть пустым')
  )
  const {value: status} = useField('status')

  const onSubmit = handleSubmit(fn)

  return {
    status,
    isSubmitting,
    onSubmit,
    fio,
    fBlur,
    fError,
    phone,
    pError,
    pBlur,
    email,
    eError,
  eBlur,
    
  }
}