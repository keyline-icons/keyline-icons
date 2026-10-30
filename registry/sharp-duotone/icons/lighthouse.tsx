import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Lighthouse({ size = 24, ...props }: IconProps) {
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
      <path d="M6.1421 21.0001L7.8344 10.0001L6 10.0001L6 8.0001L8.9881 8.0001C8.9921 8 8.996 8 9 8L15 8C15.004 8 15.0079 8 15.0119 8.0001L18 8.0001L18 10.0001L16.1656 10.0001L17.8579 21.0001L21 21.0001L21 23.0001L3 23.0001L3 21.0001L6.1421 21.0001Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M8 9L8 5C8 4.7348 8.1054 4.4804 8.2929 4.2929L11.2929 1.2929C11.4804 1.1054 11.7348 1 12 1C12.2652 1 12.5196 1.1054 12.7071 1.2929L15.7071 4.2929C15.8946 4.4804 16 4.7348 16 5L16 9C16 9.5523 15.5523 10 15 10L9 10C8.4477 10 8 9.5523 8 9ZM7.5267 12L16.4733 12L16.781 14L7.219 14L7.5267 12ZM6.8344 16.5L17.1656 16.5L17.4733 18.5L6.5267 18.5L6.8344 16.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M22.5528 2.7236L19.4472 4.2764M19.4472 13.7236L22.5528 15.2764M20 9L23 9M1.4472 2.7236L4.5528 4.2764M4.5528 13.7236L1.4472 15.2764M4 9L1 9" fill="none"/>
    </svg>
  )
}
