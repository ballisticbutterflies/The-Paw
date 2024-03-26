import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleBusiness } from "../../redux/businesses";
import CreateBusinessPage from "./BusinessForm";

const EditBusinessForm = () => {

  const { businessId } = useParams();
  const business = useSelector(state => state.businesses[businessId])
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleBusiness(businessId))
  }, [dispatch, businessId])

  if (!business) return (<>No Business Found</>)

  return (
    Object.keys(business).length > 1 && (
      <>
        <CreateBusinessPage
          business={business}
          formType="Update Business"
        />
      </>
    )
  )
}

export default EditBusinessForm;
