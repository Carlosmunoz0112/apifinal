const { Schema, model } = require('mongoose');

const facturaSchema = Schema({
   
    Nombrefactura: {
        type: String,
        required: [true, 'el nombre del producto es obligatorio']
        
    },
    fechaventa:{
        type:Date,
        required:[true, 'La fecha de venta es obligatoria'],
        validate:{
            validator: function (fechaventa){
                let fecha= new Date()
                return fechaventa<fecha
            },
            message:'La fecha de venta es mayor a la fecha actual'

        }
    },
    
    producto: {
        type: String,
        required: [true, 'el  producto es obligatorio']
    },

    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio']
    },
    cantidad: {
        type: Number,
        required: [true, 'la cantidad es obligatoria ']
    },
   
    estado: {
        type: Boolean,
        default: true,
        required: [true, 'El estado es obligatorio']
    },
    total: {
        type: Number,
        required: true
    }
});

// Antes de guardar, calcula el valor del campo 'total' multiplicando 'precio' por 'cantidad'
facturaSchema.pre('save', function (next) {
    this.total = this.precio * this.cantidad;
    next();
});

module.exports = model('factura', facturaSchema);
