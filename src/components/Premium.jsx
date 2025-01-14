import axios from "axios";
import { BASE_URL } from "../utils/constants";

export const Premium = () => {

  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      { memberShipType : type },
      { withCredentials: true }
    );

    const {amount, orderId, notes, keyId, currency } = order.data;

    const options = {
        key: keyId,
        amount,
        currency,
        name: 'Dev Tinder',
        description: 'Connect to developers',
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
        },
        theme: {
          color: '#F37254'
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
  };

  return (
    <div>
      <div className="flex mt-5 ml-3">
        <div className="card bg-base-300 rounded-box grid h-60 flex-grow place-items-center font-bold">
          <h1 className="font-bold text-3xl">Silver Membership</h1>
          <ul>
            <li> - Chat with other people</li>
            <li> - 100 connections per day</li>
            <li> - Blue tick</li>
            <li> - 3 months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("silver")}
            className="btn btn-success mr-24"
          >
            Buy Silver
          </button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-60 flex-grow place-items-center mr-10 w-28 font-bold">
          <h1 className="font-bold text-3xl">Gold Membership</h1>
          <ul>
            <li> - Chat with other people</li>
            <li> - Infinity connections per day</li>
            <li> - Blue tick</li>
            <li> - 6 months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("gold")}
            className="btn btn-success mr-28"
          >
            Buy Silver
          </button>
        </div>
      </div>
    </div>
  );
};
