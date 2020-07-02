module.exports = function(RED) {

    "use strict";
    var mapeamentoNode;

    function sendNode(config) {
        RED.nodes.createNode(this, config);
        this.mapeamento = config.mapeamento
        this.message_send = config.message_send
        this.port_send = config.port_send
        // this.websocket = config.websocket
        // this.websocketConfig = RED.nodes.getNode(this.websocket);
        mapeamentoNode = RED.nodes.getNode(this.mapeamento);
        var node = this
        
        node.on('input', function(msg, send, done) {
            var globalContext = node.context().global;
            var exportMode = globalContext.get("exportMode");
            var currentMode = globalContext.get("currentMode");
            var command = {
                type: "communication_modular_V1.0",
                slot: 1,
                method: "send",
                port_send: node.port_send,
                message_send: node.message_send
            }
            var file = globalContext.get("exportFile")
            var slot = globalContext.get("slot");
            if(currentMode == "test"){file.slots[slot].jig_test.push(command)}
            else{file.slots[slot].jig_error.push(command)}
            globalContext.set("exportFile", file);
            // node.status({fill:"green", shape:"dot", text:"done"}); // seta o status pra waiting
            send(msg)
        });
    }
    RED.nodes.registerType("send", sendNode);

    RED.httpAdmin.get("/getMapeamento",function(req,res) {
        if(mapeamentoNode){
            res.json([
                {value:mapeamentoNode.valuePort1, label: "CTS_1 | RTS_1 | RXD_1 | TXD_1 - " + mapeamentoNode.labelPort1, hasValue:false},
                {value:mapeamentoNode.valuePort2, label: "RXD_2 | TXD_2 - " + mapeamentoNode.labelPort2, hasValue:false},
                {value:mapeamentoNode.valuePort3, label: "RX_RS485 | TX_RS485 - " + mapeamentoNode.labelPort3, hasValue:false},
                {value:mapeamentoNode.valuePort4, label: "X_COM | TX_COM - " + mapeamentoNode.labelPort4, hasValue:false},
                {value:mapeamentoNode.valuePort5, label: "RX1 | TX1 - " + mapeamentoNode.labelPort5, hasValue:false},
                {value:mapeamentoNode.valuePort6, label: "RX2 | TX2 - " + mapeamentoNode.labelPort6, hasValue:false},
                {value:mapeamentoNode.valuePort7, label: "RX3 | TX3 - " + mapeamentoNode.labelPort7, hasValue:false},
                {value:mapeamentoNode.valuePort8, label: "RX4 | TX4 - " + mapeamentoNode.labelPort8, hasValue:false},
                {value:mapeamentoNode.valuePort9, label: "SDA | STL - " + mapeamentoNode.labelPort9, hasValue:false},
                {value:mapeamentoNode.valuePort10, label: "CS | SCK | MISO | MOSI - " + mapeamentoNode.labelPort10, hasValue:false},
            ])
        }
        else{
            res.json([
                {value:"RS232_1", label: "CTS_1 | RTS_1 | RXD_1 | TXD_1 - ", hasValue:false},
                {value:"RS232_2", label: "RXD_2 | TXD_2 - ", hasValue:false},
                {value:"RS485", label: "RX_RS485 | TX_RS485 - ", hasValue:false},
                {value:"UART_COM", label: "X_COM | TX_COM - ", hasValue:false},
                {value:"UART_1", label:"RX1 | TX1 - ", hasValue:false},
                {value:"UART_2", label: "RX2 | TX2 - ", hasValue:false},
                {value:"UART_3", label: "RX3 | TX3 - ", hasValue:false},
                {value:"UART_4", label: "RX4 | TX4 - ", hasValue:false},
                {value:"I2C", label: "SDA | STL - ", hasValue:false},
                {value:"SPI", label: "CS | SCK | MISO | MOSI - ", hasValue:false},
            ])
        }
    });
}