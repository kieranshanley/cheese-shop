module.exports = mongoose => {
	var schema = mongoose.Schema(
		{
			name: String,
			description: String,
			pricePerKg: Number,
			colour: String
		},
		{ timestamps: true }
	);

	schema.method("toJSON", function () {
		const { __v, _id, ...object } = this.toObject();
		object.id = _id;
		return object;
	});

	const Cheese = mongoose.model("cheese", schema);
	return Cheese;
};
