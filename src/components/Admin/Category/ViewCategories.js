import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const ViewCategories = () => {

      const { categories, setCategories } = useAuth()
      const navigate = useNavigate()

      const handleDelete = async (id) => {

            const fetchData = async () => {
                  try {
                        const response = await fetch(`https://sheba-xyz-backend.onrender.com/category/${id}`, {
                              method: 'DELETE'
                        })
                        const result = await response.json()

                        if (result.status) {
                              toast.error(`${result.message}`)
                              const fetchData = async () => {
                                    try {
                                          const response = await fetch(`https://sheba-xyz-backend.onrender.com/categories`)
                                          const result = await response.json()

                                          if (result.status) {
                                                setCategories(result.categories)
                                          }
                                          else {
                                          }
                                    } catch (error) {
                                          fetchData();
                                    }
                              };
                              fetchData();
                        }
                        else {
                        }
                  } catch (error) {
                        fetchData();
                  }
            };
            fetchData();
      }

      return (
            <div className="overflow-auto my-5 md:max-h-[525px] max-h-80 p-2">
                  <table className="min-w-full border relative">
                        <thead className="bg-white border-b sticky -top-3">
                              <tr>
                                    <th scope="col" className="text-sm font-medium text-gray-900 p-3 text-left">#</th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 p-3 text-left">Name</th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 p-3 text-left">Action</th>
                              </tr>
                        </thead>
                        <tbody>
                              {
                                    categories.length > 0 &&
                                    categories.map((category, index) =>
                                          <tr key={category._id} className="odd:bg-gray-100 even:bg-white border-b">
                                                <td className="p-3 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                                <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">{category.name}</td>

                                                <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap capitalize flex items-center">
                                                      <svg onClick={() => navigate(`/edit-category/${category._id}`)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-slate-500 cursor-pointer">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                      </svg>
                                                      <svg onClick={() => handleDelete(category._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-rose-500 ml-1 cursor-pointer">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                      </svg>

                                                      {/* <button onClick={() => navigate(`/edit-category/${category._id}`)} className='px-3 py-1 rounded bg-slate-300'>Edit</button> */}
                                                      {/* <button onClick={() => handleDelete(category._id)} className='px-3 py-1 rounded bg-rose-300 mx-1'>Delete</button> */}
                                                </td>
                                          </tr>
                                    )
                              }
                        </tbody>
                  </table>
            </div>
      );
};

export default ViewCategories;