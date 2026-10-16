import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareCursor({ size = 24, ...props }: IconProps) {
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
      <path d="M18 2C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6C2 3.79086 3.79086 2 6 2H18ZM7.87891 6.0459C6.75654 5.75993 5.70682 6.81875 6.07227 7.96582L8.93457 16.9492C9.35173 18.2582 11.1588 18.3724 11.7412 17.1318L13.5107 13.3623L17.0684 11.8877C18.3598 11.3524 18.2915 9.50506 16.9668 9.06445L7.98828 6.07812L7.87891 6.0459Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
