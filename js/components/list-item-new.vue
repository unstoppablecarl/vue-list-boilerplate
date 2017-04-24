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

                    <input class="form-control" v-model="model.name">

                </template>

                <template v-if="mode === 'save'">
                    <div class="form-control-static">
                        {{model.name}}
                    </div>
                </template>

            </div>

            <div class="col-sm-4">
                <template v-if="mode === 'edit'">

                    <input class="form-control" v-model="model.desc">

                </template>
                <template v-else>

                    <div class="form-control-static">
                        {{model.desc}}
                    </div>

                </template>
            </div>
            <div class="col-sm-1">
            </div>
            <div class="col-sm-2">

                <template v-if="mode === 'save'">
                    <div class="form-control-static">
                        <strong>Saving</strong>
                    </div>
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
    import Model from '../lib/model';

    let { defaults } = Model({
        defaults: {
            name: null,
            desc: null,
        }
    });

    export default {
        name: 'list-item-new',

        data() {
            return this.data();
        },
        methods: {
            data() {
                return {
                    mode: 'edit',
                    model: defaults(),
                };
            },
            reset(){
                _.extend(this.$data, this.data());
            },
            add() {
                this.mode = 'save';

                this.$store
                    .dispatch('create', this.model)
                    .then(() => {
                        this.reset();
                    });
            },
        },
        computed: {
            itemValid(){
                return this.model.name || this.model.desc;
            }
        }
    }
</script>