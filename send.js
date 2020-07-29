module.exports = function(RED) {

    var mapeamentoNode;

    function multipleSend(self, file, slot, currentMode){
        for(var t=0; t<self.qtdSend; t++){
            var command_n={
                type: "communication_modular_V1_0",
                slot: parseInt(mapeamentoNode.slot),
                method: "send",
                port_send: self.port_send_n[t],
                message_send: self.message_send_n[t],
                get_output: {},
                compare: {}
            }
            if(!(slot === "begin" || slot === "end")){
                if(currentMode == "test"){
                    file.slots[slot].jig_test.push(command_n);
                }
                else{
                    file.slots[slot].jig_error.push(command_n);
                }
            }
            else{
                if(slot === "begin"){
                    file.slots[0].jig_test.push(command_n);
                }
                else{
                    file.slots[3].jig_test.push(command_n);
                }
            }
        }
        return file;
    }

    function sendNode(config) {
        RED.nodes.createNode(this, config);
        this.mapeamento = config.mapeamento
        this.message_send = config.message_send
        this.port_send = config.port_send
        mapeamentoNode = RED.nodes.getNode(this.mapeamento);

        this.qtdSend = config.qtdSend;
        this.message_send_n = []; this.port_send_n = []; 
        this.message_send_n.push(config.message_send1); this.port_send_n.push(config.port_send1);
        this.message_send_n.push(config.message_send2); this.port_send_n.push(config.port_send2);
        this.message_send_n.push(config.message_send3); this.port_send_n.push(config.port_send3);
        this.message_send_n.push(config.message_send4); this.port_send_n.push(config.port_send4);
        this.message_send_n.push(config.message_send5); this.port_send_n.push(config.port_send5);
        this.message_send_n.push(config.message_send6); this.port_send_n.push(config.port_send6);
        this.message_send_n.push(config.message_send7); this.port_send_n.push(config.port_send7);
        this.message_send_n.push(config.message_send8); this.port_send_n.push(config.port_send8);
        this.message_send_n.push(config.message_send9); this.port_send_n.push(config.port_send9);
        this.message_send_n.push(config.message_send10); this.port_send_n.push(config.port_send10);
        this.message_send_n.push(config.message_send11); this.port_send_n.push(config.port_send11);
        this.message_send_n.push(config.message_send12); this.port_send_n.push(config.port_send12);
        this.message_send_n.push(config.message_send13); this.port_send_n.push(config.port_send13);
        this.message_send_n.push(config.message_send14); this.port_send_n.push(config.port_send14);
        this.message_send_n.push(config.message_send15); this.port_send_n.push(config.port_send15);
        this.message_send_n.push(config.message_send16); this.port_send_n.push(config.port_send16);
        this.message_send_n.push(config.message_send17); this.port_send_n.push(config.port_send17);
        this.message_send_n.push(config.message_send18); this.port_send_n.push(config.port_send18);
        this.message_send_n.push(config.message_send19); this.port_send_n.push(config.port_send19);
        this.message_send_n.push(config.message_send20); this.port_send_n.push(config.port_send20);
        this.message_send_n.push(config.message_send21); this.port_send_n.push(config.port_send21);
        this.message_send_n.push(config.message_send22); this.port_send_n.push(config.port_send22);
        this.message_send_n.push(config.message_send23); this.port_send_n.push(config.port_send23);
        this.message_send_n.push(config.message_send24); this.port_send_n.push(config.port_send24);


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
                    file = multipleSend(node, file, slot, currentMode)
                }
                else{
                    file.slots[slot].jig_error.push(command);
                    file = multipleSend(node, file, slot, currentMode);
                }
            }
            else{
                if(slot === "begin"){
                    file.slots[0].jig_test.push(command);
                    file = multipleSend(node, file, slot, currentMode)
                }
                else{
                    file.slots[3].jig_test.push(command);
                    file = multipleSend(node, file, slot, currentMode)
                }
            }
            globalContext.set("exportFile", file);
            console.log(command)
            send(msg)
        });
    }
    RED.nodes.registerType("send", sendNode);
}