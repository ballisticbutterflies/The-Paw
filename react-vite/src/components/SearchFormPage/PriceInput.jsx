import { useEffect, useState } from "react";

const PriceInput = ({ price, onChange}) => {

  const [activePrice, setActivePrice] = useState(price)

  useEffect(() => {
    setActivePrice(price)
  }, [price])

  return (
    <>
      <div className="price-input">
        {[1, 2, 3, 4].map((priceOrder) => (
          <span
            key={priceOrder}
            className={activePrice === priceOrder ? "price-filled" : "price-unfilled"}
            onMouseEnter={() => setActivePrice(priceOrder)}
            onMouseLeave={() => setActivePrice(activePrice)}
            onClick={()=> onChange(priceOrder)}
          >
            <i className="fa-solid fa-dollar-sign"/> &nbsp;
          </span>
        ))}
      </div>
    </>
  )
}

export default PriceInput
