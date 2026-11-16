import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TriangleRightSplit({ size = 24, ...props }: IconProps) {
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
      <path d="M17.732 2.735C19.307 1.161 22 2.276 22 4.503V18C22 19.126 21.533 20.145 20.785 20.871C20.066 21.569 19.082 22 18 22H4.503C2.276 22 1.161 19.307 2.735 17.732L10.218 10.249C10.224 10.243 10.229 10.236 10.235 10.23C10.241 10.224 10.248 10.219 10.254 10.213L17.732 2.735ZM20 4.503C20 4.085 19.527 3.863 19.208 4.097L19.146 4.149L12.353 10.942L19.918 18.562C19.97 18.383 20 18.195 20 18V4.503Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
