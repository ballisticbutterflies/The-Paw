import CreateBusinessPage from "./BusinessForm"

const CreateBusinessForm = () => {
  const newBusiness = {
    address: '',
    city: '',
    state: '',
    zip_code: '',
    name: '',
    description: '',
    price: '',
    email: '',
    website: '',
    phone: '',
    category_id: ''
  }
  return (
    <CreateBusinessPage
      business= {newBusiness}
      formType="Create Business"
    />
  )
}

export default CreateBusinessForm;
