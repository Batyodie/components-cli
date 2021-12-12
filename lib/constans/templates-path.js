export const TEMPLATES_PATH = {
    components: {
        default: './create/templates/component/vexample.vue'
    },

    modules: {
        components: './create/templates/module/components/index.ts',
        constants: './create/templates/module/constants/index.ts',
        locales: './create/templates/module/locales/example.en.yaml',

        services: [
            './create/templates/module/services/exampleService.ts',
            './create/templates/module/services/index.ts'
        ],

        stores: [
            './create/templates/module/stores/exampleActions.ts',
            './create/templates/module/stores/exampleGetters.ts',
            './create/templates/module/stores/exampleMutations.ts',
            './create/templates/module/stores/exampleState.ts',
            './create/templates/module/stores/exampleTypes.ts',
            './create/templates/module/stores/index.ts'
        ],

        typings: './create/templates/module/typings/exampleTypings.ts',
        views: './create/templates/module/views/exampleIndex.vue',
        locale: './create/templates/module/locale.ts',
        router: './create/templates/module/router.ts',
        store: './create/templates/module/store.ts'
    }
};
