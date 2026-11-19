import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PaintBucket({ size = 24, ...props }: IconProps) {
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
      <path d="M3.8159 14.3802L4.6202 19.6083C4.9205 21.5596 6.5994 23 8.5738 23L15.4262 23C17.4006 23 19.0795 21.5596 19.3798 19.6083L20.9884 9.1521C20.9961 9.1017 21 9.0509 21 9C21 8.6003 20.8679 8.2444 20.6741 7.9483C20.4847 7.6592 20.233 7.4202 19.9656 7.2226C19.4359 6.8313 18.7334 6.521 17.9551 6.2778C16.3868 5.7876 14.2815 5.5 12 5.5C9.7185 5.5 7.6132 5.7876 6.0449 6.2778C5.2666 6.521 4.5641 6.8313 4.0344 7.2226C3.767 7.4202 3.5153 7.6592 3.3259 7.9483C3.1321 8.2444 3 8.6003 3 9C3 9.0509 3.0039 9.1017 3.0116 9.1521Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4 9C4 7.6193 7.5817 6.5 12 6.5C16.4183 6.5 20 7.6193 20 9C20 10.3807 16.4183 11.5 12 11.5C7.5817 11.5 4 10.3807 4 9ZM4 9L5.6086 19.4562C5.8338 20.9197 7.093 22 8.5738 22L15.4262 22C16.907 22 18.1662 20.9197 18.3914 19.4562L20 9M4 9C4.5368 4.9922 7.9564 2 12 2C16.0436 2 19.4632 4.9922 20 9M9 11.3176V16M14.5 11.3748V14"/>
    </svg>
  )
}
