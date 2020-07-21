module.exports = function(RED) {

    "use strict";
    var mapeamentoNode;

    function sendNode(config) {
        RED.nodes.createNode(this, config);
        this.mapeamento = config.mapeamento
        this.message_send = config.message_send
        this.port_send = config.port_send
        mapeamentoNode = RED.nodes.getNode(this.mapeamento);
        var node = this
        
        node.on('input', function(msg, send, done) {
            mapeamentoNode = RED.nodes.getNode(node.mapeamento);

            var globalContext = node.context().global;
            console.log(mapeamentoNode)
            var currentMode = globalContext.get("currentMode");
            var command = {
                type: "communication_modular_V1_0",
                slot: parseInt(mapeamentoNode.slot),
                method: "send",
                port_send: node.port_send,
                message_send: node.message_send,
                get_output: {},
                compare: {}
            }
            var file = globalContext.get("exportFile")
            var slot = globalContext.get("slot");
            if(!(slot === "begin" || slot === "end")){
                if(currentMode == "test"){
                    file.slots[slot].jig_test.push(command);
                }
                else{
                    file.slots[slot].jig_error.push(command);
                }
            }
            else{
                if(slot === "begin"){
                    file.slots[0].jig_test.push(command);
                    // file.begin.push(command);
                }
                else{
                    file.slots[3].jig_test.push(command);
                    // file.end.push(command);
                }
            }
            globalContext.set("exportFile", file);
            console.log(command)
            send(msg)
        });
    }
    RED.nodes.registerType("send", sendNode);

    // RED.httpAdmin.get("/getMapeamento",function(req,res) {
    //     if(mapeamentoNode){
    //         res.json([
    //             {value:mapeamentoNode.valuePort1, label:"RS232_DB9 -" + mapeamentoNode.labelPort1, hasValue:false},
    //             {value:mapeamentoNode.valuePort2, label:"RS232_RJ11 -" + mapeamentoNode.labelPort2, hasValue:false},
    //             {value:mapeamentoNode.valuePort3, label:"RS485 -" + mapeamentoNode.labelPort3, hasValue:false},
    //             {value:mapeamentoNode.valuePort4, label:"UART_COM -" + mapeamentoNode.labelPort4, hasValue:false},
    //             {value:mapeamentoNode.valuePort5, label:"UART_1 -" + mapeamentoNode.labelPort5, hasValue:false},
    //             {value:mapeamentoNode.valuePort6, label:"UART_2 -" + mapeamentoNode.labelPort6, hasValue:false},
    //             {value:mapeamentoNode.valuePort7, label:"UART_3 -" + mapeamentoNode.labelPort7, hasValue:false},
    //             {value:mapeamentoNode.valuePort8, label:"UART_4 -" + mapeamentoNode.labelPort8, hasValue:false},
    //             {value:mapeamentoNode.valuePort9, label:"I2C -" + mapeamentoNode.labelPort9, hasValue:false},
    //             {value:mapeamentoNode.valuePort10, label:"SPI -" + mapeamentoNode.labelPort10, hasValue:false},
    //         ])
    //     }
    //     else{
    //         res.json([
    //             {value:"RS232_1", label:"RS232_DB9 -", hasValue:false},
    //             {value:"RS232_2", label:"RS232_RJ11 -", hasValue:false},
    //             {value:"RS485", label:"RS485 -", hasValue:false},
    //             {value:"UART_COM", label:"UART_COM -", hasValue:false},
    //             {value:"UART_1", label:"UART_1 -", hasValue:false},
    //             {value:"UART_2", label:"UART_2 -", hasValue:false},
    //             {value:"UART_3", label:"UART_3 -", hasValue:false},
    //             {value:"UART_4", label:"UART_4 -", hasValue:false},
    //             {value:"I2C", label:"I2C -", hasValue:false},
    //             {value:"SPI", label:"SPI -", hasValue:false},
    //         ])
    //     }
    // });
}