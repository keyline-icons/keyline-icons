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
      <path d="M2 6L2 2C2 1.4477 2.4477 1 3 1L19 1C19.4168 1 19.79 1.2586 19.9363 1.6489L21.4363 5.6489C21.4784 5.7612 21.5 5.8801 21.5 6C21.5 6.5523 21.0523 7 20.5 7L3 7C2.4477 7 2 6.5523 2 6ZM7.8746 14.9852L6.1056 11.4472C6.0361 11.3084 6 11.1552 6 11C6 10.4477 6.4477 10 7 10L18 10C18.5523 10 19 10.4477 19 11C19 11.1552 18.9639 11.3084 18.8944 11.4472L17.1254 14.9852L18.4824 17.5294C18.5184 17.5969 18.5465 17.6684 18.5662 17.7423L18.9662 19.2423C18.9886 19.3264 19 19.413 19 19.5C19 19.7652 18.8946 20.0196 18.7071 20.2071L16.2071 22.7071C16.0196 22.8946 15.7652 23 15.5 23L9.5 23C9.2348 23 8.9804 22.8946 8.7929 22.7071L6.2929 20.2071C6.1054 20.0196 6 19.7652 6 19.5C6 19.413 6.0114 19.3264 6.0338 19.2423L6.4338 17.7423C6.4535 17.6684 6.4816 17.5969 6.5176 17.5294L7.8746 14.9852Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M7 11L18 11L16 15L9 15ZM9 15L7.4 18L7 19.5L9.5 22L15.5 22L18 19.5L17.6 18L16 15M15 11L21 11L21 16M3 6L3 22L21 22M3 6L3 2L19 2L20.5 6Z" fill="none"/>
    </svg>
  )
}
