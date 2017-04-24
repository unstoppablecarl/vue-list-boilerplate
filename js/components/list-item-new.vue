<template>
    <div class="list-item-new-container">

        <div class="row list-header">
            <div class="col-sm-1">

            </div>
            <div class="col-sm-4">
                Name
            </div>
            <div class="col-sm-4">
                Desc
            </div>
            <div class="col-sm-1">
                Revision
            </div>
            <div class="col-sm-2">
                Actions
            </div>
        </div>

        <div class="row list-item-new">
            <div class="col-sm-1">
            </div>
            <div class="col-sm-4">
                <template v-if="mode === 'edit'">

                    <input class="form-control" v-model="name">

                </template>

                <template v-if="mode === 'saving'">
                    <div class="form-control-static">
                        {{name}}
                    </div>
                </template>

            </div>

            <div class="col-sm-4">
                <template v-if="mode === 'edit'">

                    <input class="form-control" v-model="desc">

                </template>
                <template v-else>

                    <div class="form-control-static">
                        {{desc}}
                    </div>

                </template>
            </div>
            <div class="col-sm-1">
            </div>
            <div class="col-sm-2">

                <template v-if="mode === 'save'">
                    <strong>Saving</strong>
                </template>

                <template v-if="mode === 'edit'">
                    <button class="btn btn-success" :disabled="!itemValid" @click="add()">Add</button>

                    <template v-if="itemValid">
                        <button class="btn btn-default" @click="reset()">Cancel</button>
                    </template>
                </template>
            </div>
        </div>
    </div>
</template>

<script>

    function start() {
        return {
            mode: 'edit',
            name: null,
            desc: null,
        }
    }

    export default {
        name: 'list-item-new',

        data() {
            return start()
        },
        methods: {
            reset(){
                _.extend(this.$data, start());
            },
            add() {
                this.mode = 'saving';

                let newItem = {
                    name: this.name,
                    desc: this.desc,
                };

                this.$store
                    .dispatch('create', newItem)
                    .then(() => {
                        this.reset();
                    });
            },
        },
        computed: {
            itemValid(){
                return this.name || this.desc;
            }
        }
    }
</script>