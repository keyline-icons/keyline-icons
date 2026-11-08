import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Move3d({ size = 24, ...props }: IconProps) {
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
      <path d="M4.726 12.53C4.993 12.52 5.379 12.63 5.572 12.82L11.227 18.47C11.415 18.72 11.519 19.1 11.435 19.4C11.352 19.7 11.069 19.97 10.782 20.09L3.243 21.97C2.902 22.05 2.541 21.95 2.293 21.71C2.046 21.46 1.945 21.1 2.029 20.76L3.924 13.17C4.051 12.93 4.46 12.6 4.726 12.53ZM18.519 12.73C18.719 12.61 19.174 12.52 19.407 12.56C19.62 12.64 19.968 12.96 20.078 13.16L21.973 20.76C22.047 21.05 21.94 21.42 21.756 21.66C21.508 21.91 21.1 22.05 20.759 21.97L13.289 20.1C12.939 20.02 12.663 19.75 12.567 19.4C12.471 19.05 12.569 18.68 12.824 18.43L18.519 12.73ZM12.002 2C12.347 2 12.67 2.18 12.852 2.47L16.891 8.97C17.082 9.28 17.09 9.66 16.915 9.98C16.738 10.3 16.403 10.5 16.04 10.5H7.963C7.6 10.5 7.265 10.3 7.089 9.98C6.913 9.66 6.922 9.28 7.113 8.97L11.183 2.42C11.372 2.19 11.702 2 12.002 2Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M13.002 10V12.5L16.603 15.2L15.401 16.8L12 14.25L8.6 16.8L7.398 15.2L11.001 12.5V10H13.002Z" fill="currentColor"/>
    </svg>
  )
}
