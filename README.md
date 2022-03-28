<br />
<h2 align="center" style="font-size: 78px">
    <strong>
        ExPx
    </strong>
</h2>
<p align="center" style="margin-top: -35px">The ExPx project, based on <a href="https://.nestjs.org/">Next</a> framework.</p>
</p>
<br />

## Technologies
- Vercel (CI/CD and Hosting)
- Next.js (React Framework SSR/SSG)
- MaterialUI (Styles/Components framework)
- Lottie (Animation files)
- React Testing Library (Test components and hooks)
- next-i18n (Internationalization)
- recharts (Animated graphs)
- Typescript (JS Spec)
- Zustand (State management)
- date-fns (Date)
- uuid (Generate token)


## Features
- JWT Auth only by Next.js
- Home Page
- Dashboard (mocked with Lido $LDO data)

## Running the application

### Development
`yarn && yarn dev`

### Production
`yarn && yarn build && yarn start`

## Project Organization

Here's a quick description of each layer that compose the application.
#### @ = All folders that init with @ should't go to final bundle.js
</br>

| Folder                         | Description |
|--------------------------------|-------------|
| `/`                            | Root content of project, where lint, tests, envs and all projects config can be found |
| `/.github/`                    | Github configuration as PR templates and pipeline actions for build and deploy |
| `/.next/`                      | All compiled files (Next and Legacy) |
| `/public/`                     | Folder for static files such as index.html, images, fonts and scripts  |
| `/public/locales`              | Folder for languages files with [react-i18next](https://react.i18next.com/) library pattern  |
| `/src/`                        | Main project structure
| `/src/@fixtures`               | Mocks and abstraction for unit and integration tests  |
| `/src/@types`                  | Types and interfaces of entities and methods |
| `/src/configs`                 | Project configuration as database building or web storage set ups |
| `/src/constants`               | Constants variables |
| `/src/layouts`                 | Components that is a UI composition, a strong candidate to be extracted and become a shared library between project, avoid use hooks relate to a module, store or api request on this folder, but if you need it, consider to create a module or add to existed one. |
| `/src/modules`                 | Modules of application based on domains, all module should have a low coupling, all module should be a strong candidate to be extracted and become a micro-frontend on feature. |
| `/src/pages`                   | Components that compose modules and layout with routes and application composition, this layer should not be extracted from the project. |
| `/src/api`                |    | Abstraction of API request and outside components, such as: Bootstrap, Feature flags and Browser storage management |
| `/src/**/__tests__`            | All unit and integration tests |
| `/src/**/__snapshots__`        | Snapshots files should have the same file's name and extensions of the test but with a `.snap` on the end. e.g: `auth.spec.ts.snap` |

#### Files
All filenames should be written on kebab-case to reset all patterns of the filenames. Thus, to make the project easily understandable for people who used another technologies (Angular/Vue/React/...). We will define the difference between files by their suffix, e.g. `auth.container/auth.component/auth.api.(ts/tsx/json/*)`

##### Test files
All test files should be located at `src/**/__tests__`, where files that you want to test will be found, e.g `src/modules/auth/__tests__`. Test files should have the same filenames and extensions of the files that will be tested e.g `auth.component.spec.ts`. Thus, they can be easily identified wheter is test file or not.