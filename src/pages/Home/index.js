import React, {useState} from 'react';
import {Button} from 'antd';
import './Home.scss';
import CSVReader from 'react-csv-reader';
import Papa from 'papaparse';
import {Link} from "react-router-dom";

function Home() {
    const [file, setFile] = useState();
    const [type, setType] = useState("0"); //
    const [desc, setDesc] = useState("0"); //
    const [regularPrice, setRegularPrice] = useState("");
    const [salePrice, setSalePrice] = useState("");
    const [categories, setCategories] = useState("");
    const [tags, setTags] = useState("");
    const [attributeName, setAttributeName] = useState("");
    const [attributeValue, setAttributeValue] = useState("");
    const attributeVisible = "0";
    const [attributeGlobal, setAttributeGlobal] = useState("0"); //


    const onFinish = () => {
        if(!file) {
            console.log("Không có dữ liệu nào được chọn");
            return;
        }

        const data = [...file];
        let newData = [];

        for (let i = 0; i < data.length; i++) {
            if (data[i]["Tax class"].length === 0) {
                data[i]["Type"] = "variable";
                data[i]["Sale price"] = ""
                newData.push(data[i]);
            }
        }

        let newArray = newData.map(function(item) {
            const DES = desc === "no" ? "" : item["Description"];
            const REGULAR = regularPrice.length !== 0 ? regularPrice : item["Regular price"];
            // const SALE = salePrice.length !== 0 ? salePrice : item["Sale price"];
            return {
                "ID": item["ID"],
                "Type": item["Type"],
                "SKU": item["SKU"],
                "Name": item["Name"],
                "Published": item["Published"],
                "Is featured?": item["Is featured?"],
                "Visibility in catalog": item["Visibility in catalog"],
                "Short description": item["Short description"],
                "Description": DES,
                "Date sale price starts": item["Date sale price starts"],
                "Date sale price ends": item["Date sale price ends"],
                "Tax status": item["Tax status"],
                "Tax class": item["Tax class"],
                "In stock?": item["In stock?"],
                "Stock": item["Stock"],
                "Low stock amount": item["Low stock amount"],
                "Backorders allowed?": item["Backorders allowed?"],
                "Sold individually?": item["Sold individually?"],
                "Weight (kg)": item["Weight (kg)"],
                "Length (cm)": item["Length (cm)"],
                "Width (cm)": item["Width (cm)"],
                "Height (cm)": item["Height (cm)"],
                "Allow customer reviews?": item["Allow customer reviews?"],
                "Purchase note": item["Purchase note"],
                "Sale price": item["Sale price"],
                "Regular price": REGULAR,
                "Categories": categories,
                "Tags": tags,
                "Shipping class": item["Shipping class"],
                "Images": item["Images"],
                "Download limit": item["Download limit"],
                "Download expiry days": item["Download expiry days"],
                "Parent": item["Parent"],
                "Grouped products": item["Grouped products"],
                "Upsells": item["Upsells"],
                "Cross-sells": item["Cross-sells"],
                "External URL": item["External URL"],
                "Button text": item["Button text"],
                "Position": item["Position"]
            };
        });

        let newProducts = [];

        const attName = attributeName.split(";");
        const attValue = attributeValue.split(";");
        const attGlobal = attributeGlobal === "no" ? "0" : "1";

        for (let j = 0; j < newArray.length; j++) {
            const newObj = { ...newArray[j] }; // Tạo một bản sao của object hiện tại trong newArray
            for (let i = 1; i <= attName.length; i++) {
                newObj[`Attribute ${i} name`] = attName[i - 1]; // Sử dụng i - 1 để truy xuất đúng chỉ số của attName và attValue
                newObj[`Attribute ${i} value(s)`] = attValue[i - 1];
                newObj[`Attribute ${i} visible`] = attributeVisible;
                newObj[`Attribute ${i} global`] = attGlobal;
            }
            newProducts.push(newObj); // Thêm object mới đã được mở rộng vào mảng newProducts
        }

        // Tải file
        const csv = Papa.unparse(newProducts);
        const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const csvUrl = URL.createObjectURL(csvData);
        const link = document.createElement('a');
        link.href = csvUrl;
        link.setAttribute('download', 'data.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const onResetSetting = () => {
        // Xử lý khi nút Cài đặt lại được nhấn
    };

    const onResetEdit = () => {
        // Xử lý khi nút Chỉnh sửa lại được nhấn
    };

    const handleFileChange = (data) => {
        setFile(data);
    };

    const handleTypeChange = (e) => {
        setType(e.target.value);
    };

    const handleDescChange = (e) => {

        setDesc(e.target.value);
    };

    const handleRegularPriceChange = (e) => {

        setRegularPrice(e.target.value);
    };

    const handleSalePriceChange = (e) => {

        setSalePrice(e.target.value);
    };

    const handleCategoryChange = (e) => {

        setCategories(e.target.value);
        // Xử lý thay đổi danh mục
    };

    const handleTagChange = (e) => {

        setTags(e.target.value);
        // Xử lý thay đổi tag
    };

    const handleAttributeNameChange = (e) => {

        setAttributeName(e.target.value);
        // Xử lý thay đổi thuộc tính tùy biến
    };

    const handleAttributeValueChange = (e) => {
        setAttributeValue(e.target.value);
        // Xử lý thay đổi thuộc tính tùy biến
    };

    const handleAttributeGlobalChange = (e) => {
        console.log(e.target.value);
        setAttributeGlobal(e.target.value);
        // Xử lý thay đổi thuộc tính tùy biến
    };

    return (
        <div className="home flex justify-center items-center">
            <div className="w-full">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="flex">
                        <div className="w-1/2 px-5 border-r">
                            <p className="text-xl font-bold my-2">Cài đặt</p>
                            <br/>

                            <label htmlFor="fileImport" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chọn file (yêu cầu file csv)</label>

{/* 1 */}
                            <CSVReader
                                onFileLoaded={handleFileChange}
                                parserOptions={{ header: true, skipEmptyLines: true }}
                            />

                            <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chọn loại</label>
{/* 2 */}
                            <select
                                id="type"
                                onChange={handleTypeChange}
                                defaultValue={0}
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            >
                                <option value="0">Chọn 1 loại</option>
                                <option value="simple">Không có biến thể</option>
                                <option value="variable">Có biến thể</option>
                            </select>
                            <br/>

                            <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giữ mô tả</label>
{/* 3 */}
                            <select
                                id="desc"
                                onChange={handleDescChange}
                                defaultValue="0"
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                >
                                <option value="0">Chọn 1 loại</option>
                                <option value="yes">Có giữ</option>
                                <option value="no">Không, xóa hết</option>
                            </select>
                            <br/>

                            <Button onClick={onResetSetting} type="primary" danger>Cài đặt lại</Button>
                        </div>

                        <div className="w-1/2 px-5">
                            <p className="text-xl font-bold my-2">Chỉnh sửa</p>
                            <br/>

                            <div className="flex">
                                <div className="w-1/2 pe-2">
                                    <label htmlFor="regularPrice" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá gốc</label>
{/* 4 */}
                                    <input
                                        value={regularPrice}
                                        type="text"
                                        id="regularPrice"
                                        onChange={handleRegularPriceChange}
                                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                    <br/>
                                </div>

                                <div className="w-1/2 ps-2">
                                    <label htmlFor="salePrice" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá khuyến mại (nếu có)</label>
{/* 5 */}
                                    <input
                                        value={salePrice}
                                        type="text"
                                        id="salePrice"
                                        onChange={handleSalePriceChange}
                                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                    <br/>
                                </div>
                            </div>

                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Danh mục</label>
{/* 6 */}
                            <input
                                value={categories}
                                type="text"
                                id="category"
                                onChange={handleCategoryChange}
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            <br/>

                            <label htmlFor="tag" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tag</label>
{/* 7 */}
                            <input
                                value={tags}
                                type="text"
                                id="tag"
                                onChange={handleTagChange}
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            <br/>

                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thuộc tính - Tùy biến</label>

                            <div className="flex">
                                <div className="w-1/3 pe-1">
                                    <label htmlFor="attributeName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên TT</label>
{/* 8 */}
                                    <input
                                        value={attributeName}
                                        type="text"
                                        id="attributeName"
                                        onChange={handleAttributeNameChange}
                                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                    <br/>
                                </div>

                                <div className="w-1/3 pe-1">
                                    <label htmlFor="attributeValue" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá trị</label>
{/* 9 */}
                                    <input
                                        value={attributeValue}
                                        type="text"
                                        id="attributeValue"
                                        onChange={handleAttributeValueChange}
                                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                    <br/>
                                </div>

                                <div className="w-1/3">
                                    <label htmlFor="attributeGlobal" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cho chọn?</label>
{/* 10 */}
                                    <select
                                        id="attributeGlobal"
                                        defaultValue="0"
                                        onChange={handleAttributeGlobalChange}
                                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        >
                                        <option value="0">Chọn 1 loại</option>
                                        <option value="yes">Có</option>
                                        <option value="no">Không</option>
                                    </select>
                                    <br/>
                                </div>
                            </div>

                            <Button onClick={onFinish} type="primary">Xuất file</Button>
                            <Button onClick={onResetEdit} className="ms-2" type="primary" danger>Cài đặt lại</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Home;