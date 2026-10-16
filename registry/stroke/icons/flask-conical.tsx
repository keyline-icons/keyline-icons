import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlaskConical({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M10.5 2L13.5 2C14.0523 2 14.5 2.4477 14.5 3L14.5 7.7741C14.5 7.9228 14.5332 8.0697 14.5971 8.204L19.8035 19.1403C20.4353 20.4675 19.4675 22 17.9976 22L6.0024 22C4.5325 22 3.5647 20.4675 4.1965 19.1403L9.4029 8.204C9.4668 8.0697 9.5 7.9228 9.5 7.7741L9.5 3C9.5 2.4477 9.9477 2 10.5 2ZM8 2L16 2M4.7394 18L19.2606 18" fill="none"/>
    </svg>
  )
}
