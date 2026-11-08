import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Mount({ size = 24, ...props }: IconProps) {
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
      <path d="M18.998 15.13C19.418 15.13 19.795 15.39 19.938 15.79C20.064 16.13 19.932 16.58 19.696 16.85L12.641 22.77C12.269 23.08 11.727 23.08 11.356 22.77L4.357 16.9C4.036 16.63 3.943 16.11 4.085 15.72C4.259 15.4 4.631 15.13 4.999 15.13L18.998 15.13ZM11.387 1.18C11.729 0.94 12.269 0.94 12.611 1.18L19.641 7.07C19.922 7.31 20.033 7.76 19.964 8.11C19.82 8.51 19.418 8.84 18.998 8.84L4.999 8.84C4.631 8.84 4.259 8.57 4.085 8.25C3.942 7.86 4.035 7.34 4.356 7.07L11.387 1.18Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M20 10.98V12.99H4V10.98H20Z" fill="currentColor"/>
    </svg>
  )
}
