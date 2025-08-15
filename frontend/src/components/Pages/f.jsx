{subcategory === "Lands & Plots"  ? (
      <div className="form-div">
        <Form.Label>Breadth </Form.Label>
        <Form.Control
          className="form-field"
          type="text"
          name="propertyBreadth"
          placeholder="Enter Plot Area"
          value={formData.propertyBreadth}
          onChange={(e) =>
            setFormData({
              ...formData,
              propertyBreadth: e.target.value,
            })
          }
        />

        {errors.propertyBreadth && (
          <p className="error-message">{errors.propertyBreadth}</p>
        )}
      </div>
    ) : (
      <null></null>
    )}