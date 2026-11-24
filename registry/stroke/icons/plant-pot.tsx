import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PlantPot({ size = 24, ...props }: IconProps) {
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
      <path d="M12 7.84C12.1282 4.6823 14.6494 2.1469 17.8063 2.0008C17.8175 2.0003 17.8288 2 17.84 2C18.2432 2 18.57 2.3268 18.57 2.73C18.57 2.7737 18.5661 2.8173 18.5583 2.8602C18.0327 5.7587 15.5089 7.8661 12.5632 7.8661C12.3751 7.8661 12.1872 7.8574 12 7.84ZM12 7.84V8.935M12 8.935C11.8128 8.9524 11.6249 8.9611 11.4368 8.9611C8.4911 8.9611 5.9673 6.8537 5.4417 3.9552C5.4339 3.9123 5.43 3.8687 5.43 3.825C5.43 3.4218 5.7568 3.095 6.16 3.095C6.1712 3.095 6.1825 3.0953 6.1937 3.0958C9.3506 3.2419 11.8718 5.7773 12 8.935ZM12 8.935V14M5 14H19M6.5 14L7.7706 20.7764C7.9036 21.4859 8.5231 22 9.2449 22H14.7551C15.4769 22 16.0964 21.4859 16.2294 20.7764L17.5 14"/>
    </svg>
  )
}
