import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Map({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M2 7.186141C2 6.089203 2.598693 5.079723 3.561252 4.553651L7.561252 2.36751C8.457833 1.877497 9.542167 1.877497 10.438748 2.36751L14.561642 4.620817C14.849146 4.777948 15.195387 4.784273 15.488438 4.637747L19.105573 2.82918C20.435375 2.164279 22 3.13127 22 4.618034L22 16.813859C22 17.910797 21.401307 18.920277 20.438748 19.446349L16.438748 21.63249C15.542167 22.122503 14.457833 22.122503 13.561252 21.63249L9.438358 19.379183C9.150854 19.222052 8.804613 19.215727 8.511562 19.362253L4.894427 21.17082C3.564625 21.835721 2 20.86873 2 19.381966Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M8 2.1715C8.7967 1.8898 9.6842 1.9551 10.4387 2.3675L14.5616 4.6208C14.8491 4.7779 15.1954 4.7843 15.4884 4.6377L16 4.382L16 21.8285C15.2033 22.1102 14.3158 22.0449 13.5613 21.6325L9.4384 19.3792C9.1509 19.2221 8.8046 19.2157 8.5116 19.3623L8 19.618Z" fill="currentColor"/>
    </svg>
  )
}
