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
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M18.618 12.0001L16.8944 15.4472C16.725 15.786 16.3788 16 16 16L9 16C8.6212 16 8.275 15.786 8.1056 15.4472L6.1056 11.4472C6.0361 11.3084 6 11.1552 6 11C6 10.4477 6.4477 10 7 10L18 10C18.004 10 18.0079 10 18.0119 10.0001L21 10.0001C21.5523 10.0001 22 10.4478 22 11.0001L22 16.0001L20 16.0001L20 12.0001L18.618 12.0001ZM2 6L2 2C2 1.4477 2.4477 1 3 1L19 1C19.4168 1 19.79 1.2586 19.9363 1.6489L21.4363 5.6489C21.4784 5.7612 21.5 5.8801 21.5 6C21.5 6.5523 21.0523 7 20.5 7L4 7L4 21L21 21L21 23L3 23C2.4477 23 2 22.5523 2 22L2 6Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd"/>
      <path d="M7.0858 21L6.2929 20.2071C6.1054 20.0196 6 19.7652 6 19.5C6 19.413 6.0114 19.3264 6.0338 19.2423L6.4338 17.7423C6.4535 17.6684 6.4816 17.5969 6.5176 17.5294L8.1176 14.5294C8.2914 14.2035 8.6307 14 9 14L16 14C16.3693 14 16.7086 14.2035 16.8824 14.5294L18.4824 17.5294C18.5184 17.5969 18.5465 17.6684 18.5662 17.7423L18.9662 19.2423C18.9886 19.3264 19 19.413 19 19.5C19 19.7652 18.8946 20.0196 18.7071 20.2071L17.9142 21L7.0858 21Z" fill="currentColor"/>
    </svg>
  )
}
