import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CoffeeMaker({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M6.1056 11.4472C6.0361 11.3083 5.9999 11.1552 5.9999 10.9999C5.9999 10.4476 6.4477 10 7 10.0001L18 10.0001C18.5523 10 19.0001 10.4477 19.0001 11C19.0001 11.1553 18.964 11.3084 18.8945 11.4473L18.6 12.0363L18.6 12L7 12C6.6212 12 6.2749 11.786 6.1056 11.4472ZM17.6281 13.98L17.1255 14.9853L18.4824 17.5295C18.5184 17.597 18.5465 17.6685 18.5663 17.7424L18.9663 19.2424C18.9887 19.3264 19 19.413 19 19.5C19 19.7652 18.8947 20.0196 18.7071 20.2072L17.9143 21L21 21L21 23L15.5119 23C15.5079 23 15.504 23.0001 15.5 23.0001L9.5 23.0001C9.4961 23.0001 9.4921 23 9.4882 23L3 23C2.4477 23 2 22.5523 2 22L2 2C2 1.4477 2.4477 1 3 1L19 1C19.4168 1 19.79 1.2586 19.9363 1.6489L21.4363 5.6489C21.4784 5.7612 21.5 5.8802 21.5 6.0002C21.5 6.5524 21.0523 7.0001 20.5 7L4 7L4 21L7.0857 21L6.2929 20.2072C6.1054 20.0197 6 19.7653 6 19.5001C6 19.4131 6.0114 19.3265 6.0338 19.2424L6.4338 17.7424C6.4535 17.6685 6.4817 17.597 6.5177 17.5295L7.8746 14.9853L7.372 13.98L17.6281 13.98Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M15 11L21 11L21 16" fill="none"/>
    </svg>
  )
}
