import React, { Component } from "react";

class Car extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: JSON.parse(localStorage.getItem("cars")) || [],
      newCar: "",
      editIndex: null,
      editCar: "",
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cars !== this.state.cars) {
      localStorage.setItem("cars", JSON.stringify(this.state.cars));
    }
  }

  addCar = () => {
    const { cars, newCar } = this.state;
    if (newCar.trim()) {
      this.setState({
        cars: [...cars, newCar],
        newCar: "",
      });
    }
  };

  deleteCar = (index) => {
    const { cars } = this.state;
    this.setState({
      cars: cars.filter((_, i) => i !== index),
    });
  };

  startEdit = (index) => {
    this.setState({
      editIndex: index,
      editCar: this.state.cars[index],
    });
  };

  saveEdit = () => {
    const { cars, editIndex, editCar } = this.state;
    if (editCar.trim()) {
      cars[editIndex] = editCar;
      this.setState({
        cars,
        editIndex: null,
        editCar: "",
      });
    }
  };

  cancelEdit = () => {
    this.setState({
      editIndex: null,
      editCar: "",
    });
  };

  render() {
    const { cars, newCar, editIndex, editCar } = this.state;

    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-center mb-6">
            Car CRUD Application
          </h1>

          <div className="mb-4">
            <input
              type="text"
              value={newCar}
              placeholder="Yangi avtomobil nomi"
              onChange={(e) => this.setState({ newCar: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={this.addCar}
              className="w-full mt-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Qo'shish
            </button>
          </div>

          <ul className="space-y-4">
            {cars.map((car, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-3 bg-gray-100 rounded-lg"
              >
                {editIndex === index ? (
                  <div className="flex items-center gap-2 w-full">
                    <input
                      type="text"
                      value={editCar}
                      onChange={(e) =>
                        this.setState({ editCar: e.target.value })
                      }
                      className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={this.saveEdit}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                    >
                      Saqlash
                    </button>
                    <button
                      onClick={this.cancelEdit}
                      className="bg-gray-400 text-white px-3 py-1 rounded-lg hover:bg-gray-500"
                    >
                      Bekor qilish
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <span>{car}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => this.startEdit(index)}
                        className="bg-yellow-400 text-white px-3 py-1 rounded-lg hover:bg-yellow-500"
                      >
                        Tahrirlash
                      </button>
                      <button
                        onClick={() => this.deleteCar(index)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                      >
                        O'chirish
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Car;
