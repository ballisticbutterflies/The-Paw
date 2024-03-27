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
    category_id: '',
    set_hours: '',
    mon_open: '',
    mon_close: '',
    tue_open: '',
    tue_close: '',
    wed_open: '',
    wed_close: '',
    thu_open: '',
    thu_close: '',
    fri_open: '',
    fri_close: '',
    sat_open: '',
    sat_close: '',
    sun_open: '',
    sun_close: ''
  }
  return (
    <CreateBusinessPage
      business={newBusiness}
      formType="Create Business"
    />
  )
}

export default CreateBusinessForm;
