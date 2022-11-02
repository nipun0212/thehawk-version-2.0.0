import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { listCategory } from "../actions/categoryActions";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ClipLoader from 'react-spinners/ClipLoader';

function AddSubCategory() {

    const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [pageTitle, setPageTitle] = useState("");
  const [pageKeywords, setPageKeywords] = useState("");
  const dispatch = useDispatch();
  const [adPostLoad, setadPostLoad] = useState(false);


  const [categoryId, setCategoryId] = useState("");
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;
  const [category, setCategory] = useState("");
  const categoryIdHandel = (e) => {
    setCategory(e.target.value);
    const filterCategory =
      categories &&
      categories.filter((curElem) => {
        return curElem.category === e.target.value;
      });

    setCategoryId(filterCategory[0]._id);
  };
    useEffect(() => {
  
        dispatch(listCategory());
      
    }, [dispatch]);
  const categoryDataSubmit = async (e) => {
    setadPostLoad(true);
    e.preventDefault();
    const res = await axios.post('/api/subCategory', {
      title,
      category,
      categoryId,
      pageTitle,
      pageKeywords,
      text,
    });
    if (res.data === "success") {
      setadPostLoad(false);
      setTitle("");
      setPageTitle("");
      setText("");
      setPageKeywords("");
      navigate('/admin/sub_category');
    }
  };
  return (
    <>
      <Header />
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="row">
                <div className="col-sm-12">
                  <div class="col-12 grid-margin stretch-card">
                    <div class="card">
                      <div class="card-body">
                        <h4 class="card-title">Add Sub category</h4>

                        <form class="forms-sample">
                          <div class="form-group">
                            <label for="exampleFormControlFile1">Title</label>
                            <input
                              class="form-control"
                              type="text"
                              placeholder="Title"
                              onChange={(e) => setTitle(e.target.value)}
                              value={title}
                            />
                          </div>

                          <div class="form-group">
                            <label for="exampleFormControlFile1">
                              Page title
                            </label>
                            <input
                              class="form-control"
                              type="text"
                              placeholder="enter page title"
                              onChange={(e) => setPageTitle(e.target.value)}
                              value={pageTitle}
                            />
                          </div>
                          <div class="form-group">
                            <label for="exampleFormControlFile1">
                              Page keywords
                            </label>
                            <input
                              class="form-control"
                              type="text"
                              placeholder="use comma to type multiple keywords"
                              onChange={(e) => setPageKeywords(e.target.value)}
                              value={pageKeywords}
                            />
                          </div>
                          <div class="form-group">
                            <label for="exampleFormControlTextarea1">
                              Page description
                            </label>
                            <textarea
                              class="form-control"
                              id="exampleFormControlTextarea1"
                              rows="3"
                              onChange={(e) => setText(e.target.value)}
                              value={text}
                            ></textarea>
                          </div>
                          <div class="form-group">
                            <label for="exampleSelectGender">Category</label>
                            <select
                              class="form-control"
                              id="exampleSelectGender"
                              onChange={categoryIdHandel}
                            >
                              <option>
                                {!category ? 'Select the  category' : ''}
                                {category && !categoryId
                                  ? 'Select the  category'
                                  : ''}
                              </option>
                              {categories &&
                                categories.map((elem) => (
                                  <option>{elem.category}</option>
                                ))}
                            </select>
                          </div>

                          <button
                            type="submit"
                            class="btn btn-primary me-2"
                            onClick={categoryDataSubmit}
                            style={{ width: '13%' }}
                            disabled={adPostLoad}
                          >
                            Add
                          </button>
                        </form>
                        <ClipLoader
                          color="skyblue"
                          loading={adPostLoad}
                          size={50}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddSubCategory;