import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItems, removeFromCart, updateQuantity } from './cartSlice';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function Cart() {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  console.log(cartItems)
  const handleRemove = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <>
      <div className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 px-6 sm:px-6 lg:px-8">
          <h2 className="text-2xl">Cart</h2>

          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {cartItems.map((product) => (
                <li key={product.id} className="flex py-6">
                  <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img alt={product.imageAlt} src={product.images[0]} className="size-full object-cover" />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <Link to={`/product/${product.id}`}>{product.name}</Link>
                        </h3>
                        <p className="ml-4">${product.price * product.quantity}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500">
                        <label htmlFor="quantity" className="inline mr-5 text-sm font-medium leading-6 text-gray-900">
                          Qty
                        </label>
                        <select
                          value={product.quantity}
                          onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                        >
                          {[1, 2, 3, 4].map((qty) => (
                            <option key={qty} value={qty}>
                              {qty}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex">
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={() => handleRemove(product.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${calculateSubtotal().toFixed(2)}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
          <div className="mt-6">
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{' '}
              <Link to="/">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
