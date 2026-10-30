import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CoffeePot({ size = 24, ...props }: IconProps) {
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
      <path d="M4.675 9.0377L2.1275 4.4886C2.0439 4.3393 2 4.1711 2 4C2 3.4477 2.4477 3 3 3L17 3C17.5523 3 18 3.4477 18 4C18 4.1711 17.9561 4.3393 17.8725 4.4886L15.325 9.0377L17.3432 13.2851C17.3479 13.295 17.3524 13.305 17.3568 13.315L17.9168 14.6007C17.9717 14.7267 18 14.8626 18 15L18 17C18 17.2652 17.8946 17.5196 17.7071 17.7071L14.7071 20.7071C14.5196 20.8946 14.2652 21 14 21L6 21C5.7348 21 5.4804 20.8946 5.2929 20.7071L2.2929 17.7071C2.1054 17.5196 2 17.2652 2 17L2 15C2 14.8626 2.0283 14.7267 2.0832 14.6007L2.6432 13.315C2.6476 13.305 2.6521 13.295 2.6568 13.2851L4.675 9.0377Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3 4L17 4L14.2 9L5.8 9ZM5.8 9L3.56 13.7143L3 15L3 17L6 20L14 20L17 17L17 15L16.44 13.7143L14.2 9M15 4L21 4L21 12" fill="none"/>
    </svg>
  )
}
